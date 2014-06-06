var express = require('express');
var router = express.Router();

var db = require('../modules/database');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'lunchnavigatorify' });
});

router.post('/', function (req, res) {
    db.saveLocation({
        name: req.param('lunchspot')
    }, function (err, saved) {
        if (err) {
            console.log('There was an error saving the article, i think?' + err);
        } else {
            console.log('nice job.');
        }
    });
});

module.exports = router;