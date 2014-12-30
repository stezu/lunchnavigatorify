var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function (req, res) {
    res.send('This is a login page.');
});

router.get('/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ]
}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    res.redirect(req.session.returnTo || '/');
});

module.exports = router;
