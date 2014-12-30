var auth = (function () {
    "use strict";

    var config = require('../appconfig.js'),
        db = require('./database'),
        passport = require('passport'),
        GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

    return {
        init: function () {
            passport.use(new GoogleStrategy({
                    clientID: config.google.clientID,
                    clientSecret: config.google.clientSecret,
                    callbackURL: config.appUrl + 'login/google/callback',
                },
                function(accessToken, refreshToken, profile, done) {
                    // console.log(accessToken, refreshToken, profile, done);
                    db.findAndModify('users',
                    {
                        query: {
                            provider: 'google',
                            providerId: profile.id
                        },
                        update: {
                            accessToken: accessToken,
                            displayName: profile.displayName,
                            email: profile.emails[0].value,
                            refreshToken: refreshToken
                        },
                        new: true,
                        upsert: true
                    },
                    function (err, results) {
                        return done(null, results);
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
        },

        ensure: function (req, res, next) {
            if (req.isAuthenticated()) { return next(); }
            req.session.returnTo = req.originalUrl;

            res.redirect(config.appUrl + 'login/google');
        }
    };
}());

module.exports = auth;
