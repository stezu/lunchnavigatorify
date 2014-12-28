var config = require('../appconfig.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

exports.init = function () {
    passport.use(new GoogleStrategy({
            returnURL: config.appUrl + '/login/google/return',
            realm: config.appUrl
        },
        function(identifier, profile, done) {
            // console.log(identifier, profile, done);

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