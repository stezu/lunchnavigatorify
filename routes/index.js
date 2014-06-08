var express = require('express');
var router = express.Router();

var db = require('../modules/database');
var yelp = require('../modules/yelp');

/* GET home page. */
router.get('/', function (req, res) {
    // res.render('index', { title: 'Lunch Me' });
    db.getLocations(function (err, results) {
        res.render('results', {
            title: 'Lunch Me',
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
