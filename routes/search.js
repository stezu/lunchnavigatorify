var express = require('express');
var router = express.Router();

var yelp = require('../modules/yelp');

router.get('/', function (req, res) {
    console.log(req.query);
    yelp.search({
        term: req.query.restaurant,
        location: 33612
    }, function (err, data) {
        if (err) {
            res.send('Yelp Error');
        } else {
            res.send(data);
            // res.render('results', {
            //     title: 'lunchnavigatorify - yelp style',
            //     locations: data.businesses
            // });
        }
    });
});

module.exports = router;