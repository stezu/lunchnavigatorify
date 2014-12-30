var express = require('express');
var router = express.Router();

var yelp = require('../modules/yelp');

router.get('/', function (req, res) {
    console.log(req.query.location);
    yelp.search({
        term: req.query.restaurant,
        location: req.query.location,
        limit: req.query.page_limit
    }, function (err, data) {
        res.send(data);
    });
});

module.exports = router;
