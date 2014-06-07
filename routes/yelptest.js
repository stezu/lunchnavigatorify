var express = require('express');
var router = express.Router();

var yelp = require('../modules/yelp');

router.get('/', function (req, res) {
    res.render('yelpsearch', { title: 'lunchnavigatorify - yelp style' });
});

router.post('/', function (req, res) {
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