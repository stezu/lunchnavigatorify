var express = require('express'),
	router = express.Router();

var db = require('../modules/database'),
	auth = require('../modules/auth');

router.use(auth.ensure);

// TODO: we will update the db to use 'groups' istead of orgs, using this now so we can have some data
router.get('/:group', function (req, res) {
    db.findOne('organizations', { slug: req.param('group') }, function (err, results) {
        if (err) {
            // this should send a friendly mesaage to the user that maybe triggers an alert or something
            console.log('There was an error retrieving your organization\'s restaurants.');
        } else {
            console.log(results);
            res.render('group', {
                title: results.name + ' lunch spots',
                zip: results.zip,
                locations: results.restaurants ? results.restaurants : []
            });
        }
    });
});

module.exports = router;