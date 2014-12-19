var express = require('express');
var router = express.Router();

var zip = require('../modules/gps2zip');

router.post('/getzip', function (req, res) {
    res.send(zip(req.body.lat, req.body.lon));
});

module.exports = router;