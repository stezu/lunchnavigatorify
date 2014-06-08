var config = require('../appconfig');

var yelp = require('yelp').createClient({
    consumer_key: config.yelp.consumer_key,
    consumer_secret: config.yelp.consumer_secret,
    token: config.yelp.token,
    token_secret: config.yelp.token_secret
});

exports.search = function (query, callback) {
    yelp.search(
    (function () {
        var object = {};
        for (item in query) {
            object[item] = query[item];
        }
        return object;
    })(),
    function (err, data) {
        if (err) {
            console.log('There was a problem in yelp.search and it was', err);
        }
        callback(err, data);
    });
};