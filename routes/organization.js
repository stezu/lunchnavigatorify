var express = require('express');
var router = express.Router();

var db = require('../modules/database');

router.get('/:organization', function (req, res) {
    res.send(req.param('organization'));
});

module.exports = router;