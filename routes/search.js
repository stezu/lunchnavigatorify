var express = require('express');
var router = express.Router();

var yelp = require('../modules/yelp');

router.get('/', function (req, res) {
    yelp.search({
        term: req.query.restaurant,
        limit: req.query.page_limit,
        location: 33612
    }, function (err, data) {
        res.send(data);
    });
});

module.exports = router;