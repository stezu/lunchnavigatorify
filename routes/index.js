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

    console.log('we get here', req.body);
        
    db.save('organizations',
        {
            'name': req.body.orgName,
            'slug': req.body.url,
            'zip':  req.body.zip
        },
        function (err, results) {
            console.log(results);
        });
});

module.exports = router;
