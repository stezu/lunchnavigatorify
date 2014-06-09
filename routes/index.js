var express = require('express');
var router = express.Router();

var db = require('../modules/database');
var yelp = require('../modules/yelp');

/* GET home page. */
router.get('/', function (req, res) {
    db.find('restaurants', {}, function (err, results) {
        res.render('index', {
            title: 'lunchnavigatorify',
            locations: results
        });
    });
});

router.post('/', function (req, res) {
    // Not currently being used
    yelp.search({
        term: req.param('lunchspot'),
        location: 33612
    }, function (err, data) {
        // res.send(data.businesses);
        res.render('results', {
            title: 'lunchnavigatorify - yelp style',
            locations: data.businesses
        });
    });
});

module.exports = router;
