var express = require('express');
var router = express.Router();

var db = require('../modules/database');
var auth = require('../modules/auth');

router.use(auth.ensure);

router.post('/new', function (req, res) {
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
                res.render('organizations', {
                    organizations: results
                });
            });
        }
    );
});

router.get('/:organization', function (req, res) {
    db.findOne('organizations', { slug: req.param('organization') }, function (err, results) {
        if (err) {
            // this should send a friendly mesaage to the user that maybe triggers an alert or something
            console.log('There was an error retrieving your organization\'s restaurants.');
        } else {
            console.log(results);
            res.render('index', {
                title: results.name + ' lunch spots',
                zip: results.zip,
                locations: results.restaurants ? results.restaurants : []
            });
        }
    });
});

router.post('/:organization', function (req, res) {
    var restaurant = {
            _id: db.makeObjectId(),
            yelp: {
                name:      req.body.name ? req.body.name : null,
                id:        req.body.id ? req.body.id : null,
                location:  req.body.location ? req.body.location : null,
                is_closed: req.body.is_closed ? req.body.is_closed : null,
                url:       req.body.url ? req.body.url : null,
                image_url: req.body.image_url ? req.body.image_url : null,
                rating:    req.body.rating ? req.body.rating : null
            }
        };

    db.update('organizations', { slug: req.param('organization') }, { '$push': { 'restaurants': restaurant }}, function (err, results) {
        if (err) {
            console.log('There was an error adding this restaurant to your organization.  Sorry mate.', err);
        } else {
            console.log('Organization updated.');

            db.findOne('organizations', { slug: req.param('organization') }, function (err, results) {
                res.render('results', {
                    locations: results.restaurants
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
            db.findOne('organizations', { slug: req.param('organization') }, function (err, results) {
                res.render('results', {
                    locations: results.restaurants
                });
            });
        }
    });
});

module.exports = router;