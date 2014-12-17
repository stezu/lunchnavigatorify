var express = require('express');
var router = express.Router();

var db = require('../modules/database');
var yelp = require('../modules/yelp');

/* GET home page. */
router.get('/', function (req, res) {
    db.find('organizations',
        {},
        function (err, results) {
            res.render('home', {
                title: 'lunchnavigatorify',
                organizations: results
            });
    });
});

router.post('/', function (req, res) {        
    db.save('organizations',
        {
            'name': req.body.orgName,
            'slug': req.body.url,
            'zip':  req.body.zip
        },
        function (err, results) {
            console.log(results, 'was saved.');

            db.find('organizations', {}, function (err, results) {
                console.log(results);
                res.render('home', {
                    title: 'lunchnavigatorify',
                    organizations: results
                });
            });
        });
});

module.exports = router;
