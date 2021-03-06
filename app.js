var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express(),
    server = require('http').Server(app),
    io = require('./modules/chatSocket').init(server),
    auth = require('./modules/auth').init();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(auth.initialize());
app.use(auth.session());
app.use(express.static(path.join(__dirname, 'public')));

// global variables for views
app.use(function(req, res, next) {
    if (req.user) {
        var hash = require('crypto').createHash('md5').update(req.user.email).digest('hex');
        req.user.avatar = 'http://www.gravatar.com/avatar/' + hash;
        res.locals.user = req.user;
    }

    next();
});

app.use('/', require('./routes/index'));
app.use('/yelp', require('./routes/yelp'));
app.use('/users', require('./routes/users'));
app.use('/location', require('./routes/location'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/search', require('./routes/search'));
app.use('/group', require('./routes/group'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// listen on port 3000
server.listen(3000, function () {
    console.log('Web server running on port 3000');
});

module.exports = server;
