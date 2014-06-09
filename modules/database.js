var config = require('../appconfig.js'),
    mongojs = require('mongojs');

var db = mongojs(config.mongo.mongo_uri, ['restaurants', 'organizations']);

exports.getObjectId = function (id) {
    return mongojs.ObjectId(id);
};

exports.findOrganization = function (query, callback) {
    db.organizations.find(query, function (err, results) {
        if (err) {
            console.log('There was an error in db.findAll ' + err);
        }
        callback(err, results);
    });
};

exports.saveLocation = function (location, callback) {
    db.restaurants.save(location, function (err, saved) {
        if (err) {
            console.log('There was an error in db.saveLocation:', err);
        }
        callback (err, saved);
    });
};

exports.getLocations = function (callback) {
    db.restaurants.find().toArray(function (err, results) {
        if (err) {
            console.log('There was an error in db.getLocations ' + err);
        }
        callback(err, results);
    });
};

exports.deleteLocation = function (location, callback) {
    db.restaurants.remove(location);
    callback();
};