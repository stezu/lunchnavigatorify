var express = require('express');
var router = express.Router();

var db = require('../modules/database');

router.get('/:organization', function (req, res) {
    db.find('organizations', { slug: req.param('organization') }, function (err, results) {
        if (err) {
            // this should send a friendly mesaage to the user that maybe triggers an alert or something
            console.log('There was an error retrieving your organization\'s restaurants.');
        } else {
            console.log(results[0].restaurants);
            res.render('index', {
                title: results[0].name + ' lunch spots',
                locations: results[0].restaurants
            });
        }
    });
});

router.post('/:organization', function (req, res) {
    var restaurant = {
            _id: db.makeObjectId(),
            yelp: {}
        };

    restaurant.yelp.name        = req.body.name ? req.body.name : null;
    restaurant.yelp.id          = req.body.id ? req.body.id : null;
    restaurant.yelp.location    = req.body.location ? req.body.location : null;
    restaurant.yelp.is_closed   = req.body.is_closed ? req.body.is_closed : null;
    restaurant.yelp.url         = req.body.url ? req.body.url : null;
    restaurant.yelp.image_url   = req.body.image_url ? req.body.image_url : null;
    restaurant.yelp.rating      = req.body.rating ? req.body.rating : null;

    db.update('organizations', { slug: req.param('organization') }, { '$push': { 'restaurants': restaurant }}, function (err, results) {
        if (err) {
            console.log('There was an error adding this restaurant to your organization.  Sorry mate.', err);
        } else {
            console.log('Organization updated.');

            db.find('organizations', { slug: req.param('organization') }, function (err, results) {
                res.render('results', {
                    locations: results[0].restaurants
                });
            });
        }
    });
});

router.delete('/:organization', function (req, res) {
    db.update('organizations', { slug: req.param('organization') },
    {
        "$pull": {
            "restaurants": {
                "_id": db.getObjectId(req.body.id)
            }
        }
    }, function (err, results) {
        if (err) {
            console.log('There was an error deleting the location, I think?', err);
        } else {
            db.find('organizations', { slug: req.param('organization') }, function (err, results) {
                res.render('results', {
                    locations: results[0].restaurants
                });
            });
        }
    });
});

module.exports = router;