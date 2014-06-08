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
        yelp: {
            id: req.body.id,
            name: req.body.name
        }
    }, function (err, saved) {
        if (err) {
            console.log('There was an error saving the location, probably:', err);
        } else {
            console.log('nice job.');
            res.redirect('/');
        }
    });
});

module.exports = router;