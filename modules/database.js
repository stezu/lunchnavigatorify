var database = (function () {
    "use strict";

    var config = require('../appconfig.js'),
        mongojs = require('mongojs');

    var db = mongojs(config.mongo.mongo_uri, ['organizations', 'users']);

    return {
        getObjectId: function (id) {
            return mongojs.ObjectId(id);
        },

        makeObjectId: function () {
            return new mongojs.ObjectId();
        },

        find: function (collection, query, callback) {
            db[collection].find(query, function (err, results) {
                if (err) {
                    console.log('There was an error in db.find:', err);
                }
                callback(err, results);
            });
        },

        findOne: function (collection, query, callback) {
            db[collection].findOne(query, function (err, results) {
                if (err) {
                    console.log('There was an error in db.findOne:', err);
                }
                callback(err, results);
            });
        },

        findAndModify: function (collection, data, callback) {
            db[collection].findAndModify(data, function (err, results) {
                if (err) {
                    console.log('There was an error in db.findAndModify:', err);
                }
                callback(err, results);
            });
        },

        save: function (collection, data, callback) {
            db[collection].save(data, function (err, results) {
                if (err) {
                    console.log('There was an error in db.save:', err);
                }
                callback(err, results);
            });
        },

        update: function (collection, query, data, callback) {
            db[collection].update(query, data, function (err, results) {
                if (err) {
                    console.log('There was an error in db.update:', err);
                }
                callback(err, results);
            });
        },

        delete: function (collection, query, justOne, callback) {
            db[collection].remove(query, justOne, function (err, results) {
                if (err) {
                    console.log('There was an error in db.delete:', err);
                }
                callback(err, results);
            });
        }
    };
}());

module.exports = database;
