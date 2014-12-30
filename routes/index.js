var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var db = require('../modules/database');
var yelp = require('../modules/yelp');

/* GET home page. */
router.get('/', function (req, res) {
    db.find('organizations',
        {},
        function (err, results) {
            if (req.user) {
                var hash = crypto.createHash('md5').update(req.user.email).digest('hex');
                req.user.avatar = 'http://www.gravatar.com/avatar/' + hash;
            }

            res.render('home', {
                bodyClass: 'home',
                title: 'lunchnavigatorify',
                user: req.user,
                organizations: results
            });
    });
});

module.exports = router;
