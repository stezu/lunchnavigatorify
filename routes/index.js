var express = require('express');
var router = express.Router();

var db = require('../modules/database');
var yelp = require('../modules/yelp');

/* GET home page. */
router.get('/', function (req, res) {
    db.find('groups',
    {},
    function (err, results) {
        res.render('home', {
            bodyClass: 'home',
            title: 'gruplun.ch',
            groups: results
        });
    });
});

module.exports = router;
