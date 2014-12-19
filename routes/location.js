var express = require('express');
var router = express.Router();

var zip = require('../modules/gps2zip');

router.get('/:latitude/:longitude', function (req, res) {
    res.send(zip(req.param('latitude'), req.param('longitude')));
});

module.exports = router;