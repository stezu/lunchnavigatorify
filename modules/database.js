var mongojs = require('mongojs');

var db = mongojs('mongodb://lunchnavigatorify:letshavelunch!@kahana.mongohq.com:10039/lunch_db', ['lunch']);

exports.findAll = function (callback) {
    db.lunch.find().toArray(function (err, results) {
        if (err) {
            console.log('There was an error in db.findAll ' + err);
        }
        callback(err, results);
    });
};

exports.saveLocation = function (location, callback) {
    db.lunch.save(location, function (err, saved) {
        if (err) {
            console.log('There was an error in db.saveLocatioin ' + err);
        }
        callback (err, saved);
    });
};