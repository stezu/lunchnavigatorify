var express = require('express');
var router = express.Router();

var auth = require('../modules/auth');

router.use(auth.ensure);

router.get('/', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
