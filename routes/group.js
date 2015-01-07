var express = require('express'),
    router = express.Router();

var config = require('../appconfig.js'),
    db = require('../modules/database'),
    auth = require('../modules/auth'),
    groups = require('../modules/group'),
    socket = require('../modules/chatSocket');

router.use(auth.ensure);

router.post('/new', function (req, res) {
    db.save('groups',
    {
        'name' : req.body.orgName,
        'slug' : req.body.url,
        'zip'  : req.body.zip,
        'users': [{
            'role': 'admin',
            '_id' : req.user._id
        }]
    },
    function (err, results) {
        console.log(results, 'was saved.');

        db.find('groups', {}, function (err, results) {
            // console.log(results);
            res.render('groups', {
                groups: results
            });
        });
    });
});

router.use('/:group', function (req, res, next) {
    db.find('groups',
    {
        'slug' : req.param('group'),
        'users': {
            '$elemMatch': {
                '_id': req.user._id
            }
        }
    },
    function (err, results) {
        if (err) {
            console.log('There was an error authenticating the user:', err);
        } else {
            if (results.length) {
                console.log('User is a member of the "' + req.param('group') + '" group.');
                return next();
            } else {
                console.log('User is not a member of the "' + req.param('group') + '" group.');

                // Add the user to the group (temporary for testing)
                db.update('groups',
                {
                    'slug': req.param('group')
                },
                {
                    '$push': {
                        'users': {
                            'role': 'member',
                            '_id': req.user._id
                        }
                    }
                },
                function (err, results) {
                    if (err) {
                        console.log('There was an error adding the user to the group:', err);
                    } else {
                        console.log('User successfully added to the "' + req.param('group') + '" group.');

                        return next();
                    }
                });
            }
        }
    });
});

router.get('/:group', function (req, res) {

	// if a namespaced socket for this group doesn't exist already, start it up
	if (!socket.groupExists(req.param('group'))) {
		socket.newGroup(req.param('group'));
	}

    db.findOne('groups',
    {
        'slug': req.param('group')
    },
    function (err, results) {
        if (err) {
            // this should send a friendly message to the user that maybe triggers an alert or something
            console.log('There was an error retrieving your group\'s restaurants.');
        } else {
            res.render('group', {
                'title'    : results.name + ' lunch spots',
                'zip'      : results.zip,
                'locations': results.restaurants ? results.restaurants : []
            });
        }
    });
});

router.post('/:group', function (req, res) {
    db.findAndModify('groups',
    {
        'query': {
            'slug': req.param('group')
        },
        'update': {
            '$push': {
                'restaurants': {
                    '_id' : db.makeObjectId(),
                    'yelp': {
                        'name'     : req.body.name ? req.body.name : null,
                        'id'       : req.body.id ? req.body.id : null,
                        'location' : req.body.location ? req.body.location : null,
                        'is_closed': req.body.is_closed ? req.body.is_closed : null,
                        'url'      : req.body.url ? req.body.url : null,
                        'image_url': req.body.image_url ? req.body.image_url : null,
                        'rating'   : req.body.rating ? req.body.rating : null
                    }
                }
            }
        },
        'new': true,
        'upsert': true
    },
    function (err, results) {
        if (err) {
            console.log('There was an error adding this restaurant to your group.  Sorry mate.', err);
        } else {
            console.log('Group updated.');

            res.render('results', {
                'locations': results.restaurants
            });
        }
    });
});

router.delete('/:group', function (req, res) {
    db.findAndModify('groups',
    {
        'query': {
            'slug': req.param('group')
        },
        'update': {
            '$pull': {
                'restaurants': {
                    '_id': db.getObjectId(req.body.id)
                }
            }
        },
        'new': true,
        'upsert': true
    },
    function (err, results) {
        if (err) {
            console.log('There was an error deleting the location.', err);
        } else {
            res.render('results', {
                'locations': results.restaurants
            });
        }
    });
});

module.exports = router;
