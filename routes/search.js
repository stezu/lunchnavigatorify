var express = require('express');
var router = express.Router();

var db = require('../modules/database');

router.get('/', function (req, res) {
    console.log(req.query.s);
    db.ensureIndex('groups',
    {
        'name': 'text',
        'slug': 'text',
        'location': 'text'
    }, {
        'name': 'groupIndex',
        'weights': {
           'name': 4,
           'location': 3,
           'slug': 2
        }
    });

    db.ensureIndex('users',
    {
        'name': 'text'
    }, {
        'name': 'userIndex',
        'weights': {
            'name': 4,
            'email': 2
        }
    });

    var data = [];

    db.find('groups',
    {
        '$text': {
            '$search': req.query.s
        }
    },
    function (err, results) {
        data = data.concat(results);

        db.find('users',
        {
            '$text': {
                '$search': req.query.s
            }
        },
        function (err, results) {
            data = data.concat(results);
            res.send(data);
        });
    });
});

module.exports = router;
