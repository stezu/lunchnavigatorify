var express = require('express');
var router = express.Router();

var db = require('../modules/database');

/* GET users listing. */
router.get('/', function(req, res) {
    db.find('users',
        {},
        function (err, results) {
            res.send(results);
    });
});

module.exports = router;
