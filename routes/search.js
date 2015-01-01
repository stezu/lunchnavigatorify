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
        'weights': {
           'name': 4,
           'location': 3,
           'slug': 2
        }
    });

    db.find('groups',
    {
        '$text': {
            '$search': req.query.s
        }
    },
    function (err, results) {
        res.send(results);
    });
});

module.exports = router;
