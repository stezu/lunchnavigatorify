var express = require('express');
var router = express.Router();

var db = require('../modules/database');

router.get('/', function (req, res) {
    db.find('restaurants', {}, function (err, results) {
        res.render('results', {
            locations: results
        });
    });
});

router.post('/', function (req, res) {
    db.save('restaurants', {
        yelp: req.body
    }, function (err, results) {
        if (err) {
            console.log('There was an error saving the location, probably:', err);
        } else {
            console.log('nice job.');

            db.find('restaurants', {}, function (err, results) {
                res.render('results', {
                    locations: results
                });
            });
        }
    });
});

router.delete('/', function (req, res) {
    db.delete('restaurants', {
        '_id': db.getObjectId(req.body.id)
    }, 1, function (err, results) {
        if (err) {
            console.log('There was an error deleting the location, I think?', err);
        } else {
            db.find('restaurants', {}, function (err, results) {
                res.render('results', {
                    locations: results
                });
            });
        }
    });
});

module.exports = router;