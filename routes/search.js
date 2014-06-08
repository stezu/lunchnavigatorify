var express = require('express');
var router = express.Router();

var yelp = require('../modules/yelp');

router.get('/', function (req, res) {
    yelp.search({
        category_filter: 'food',
        term: req.query.restaurant,
        limit: req.query.page_limit,
        location: 33612
    }, function (err, data) {
        if (err) {
            console.log('Yelp Error:', data);
        }
        res.send(data);
        // res.render('results', {
        //     title: 'lunchnavigatorify - yelp style',
        //     locations: data.businesses
        // });
    });
});

module.exports = router;