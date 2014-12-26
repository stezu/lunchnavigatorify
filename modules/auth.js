var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

exports.init = function () {
    passport.use(new GoogleStrategy({
            returnURL: 'http://localhost:3000/login/google/return',
            realm: 'http://localhost:3000/'
        },
        function(identifier, profile, done) {
            console.log(identifier, profile, done);

            return done(false, {
                un: 'peppy',
                pw: 'gonzalez'
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    return passport;
};

exports.ensure = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    req.session.returnTo = req.originalUrl;

    res.redirect('/login/google');
};