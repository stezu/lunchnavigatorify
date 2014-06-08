var express = require('express');
var router = express.Router();

var db = require('../modules/database');

router.get('/', function (req, res) {
    db.getLocations(function (err, results) {
        res.render('results', {
            locations: results
        });
    });
});

router.post('/', function (req, res) {
    db.saveLocation({
        yelp: req.body
    }, function (err, saved) {
        if (err) {
            console.log('There was an error saving the location, probably:', err);
        } else {
            console.log('nice job.');
        }
    });
    db.getLocations(function (err, results) {
        res.render('results', {
            locations: results
        });
    });
});

module.exports = router;