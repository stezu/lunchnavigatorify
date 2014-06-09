var config = require('../appconfig.js'),
    mongojs = require('mongojs');

var db = mongojs(config.mongo.mongo_uri, ['restaurants', 'organizations']);

exports.getObjectId = function (id) {
    return mongojs.ObjectId(id);
};

exports.find = function (collection, query, callback) {
    db[collection].find(query, function (err, results) {
        if (err) {
            console.log('There was an error in db.find:', err);
        }
        callback(err, results);
    });
};

exports.saveLocation = function (location, callback) {
    db.restaurants.save(location, function (err, results) {
        if (err) {
            console.log('There was an error in db.saveLocation:', err);
        }
        callback (err, results);
    });
};

exports.getLocations = function (callback) {
    db.restaurants.find().toArray(function (err, results) {
        if (err) {
            console.log('There was an error in db.getLocations:', err);
        }
        callback(err, results);
    });
};

exports.deleteLocation = function (location, justOne, callback) {
    db.restaurants.remove(location, justOne, function (err, results) {
        if (err) {
            console.log('There was an error in db.deleteLocation:', err);
        }
        callback(err, results);
    });
};