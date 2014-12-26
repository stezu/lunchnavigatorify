var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function (req, res) {
	res.send('This is a login page.');
});

router.get('/google', passport.authenticate('google'));

router.get('/google/return', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;