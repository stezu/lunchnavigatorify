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

module.exports = router;