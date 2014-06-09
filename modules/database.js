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

exports.save = function (collection, data, callback) {
    db[collection].save(data, function (err, results) {
        if (err) {
            console.log('There was an error in db.save:', err);
        }
        callback (err, results);
    });
};

exports.delete = function (collection, query, justOne, callback) {
    db[collection].remove(query, justOne, function (err, results) {
        if (err) {
            console.log('There was an error in db.delete:', err);
        }
        callback(err, results);
    });
};