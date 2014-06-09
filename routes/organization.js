var express = require('express');
var router = express.Router();

var db = require('../modules/database');

router.get('/:organization', function (req, res) {
    db.find('organizations', { slug: req.param('organization') }, function (err, results) {
        if (err) {
            // this should send a friendly mesaage to the user that maybe triggers an alert or something
            console.log('There was an error retriving your organization\'s restaurants.');
        } else {
            console.log(results[0].restaurants);
            res.render('index', {
                title: results[0].name + ' lunch spots',
                locations: results[0].restaurants
            });
        }
    });
});

router.put('/:organization/:type', function () {
    var restaurant      = {},
        restaurant.yelp = {};

    restaurant.yelp.name        = req.body.name ? req.body.name : null;
    restaurant.yelp.yelp_id     = req.body.id ? req.body.id : null;
    restaurant.yelp.location    = req.body.location ? req.body.location : null;
    restaurant.yelp.is_closed   = req.body.is_closed ? req.body.is_closed : null;
    restaurant.yelp.yelp_url    = req.body.url ? req.body.url : null;
    restaurant.yelp.image_url   = req.body.image_url ? req.body.image_url : null;
    restaurant.yelp.yelp_rating = req.body.rating ? restaurant.body.rating : null;

    db.update('organizations', { slug: req.param('organization') }, { '$push': { 'restaurants': restaurant }}, function (err, results) {
        if (err) {
            console.log('There was an error adding this restaurant to your organization.  Sorry mate.', err);
        } else {
            console.log(results);
        }
    });
});

module.exports = router;