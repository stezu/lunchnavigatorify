var yelp = (function () {
    "use strict";

    var config = require('../appconfig');

    var yelp = require('yelp').createClient({
        consumer_key: config.yelp.consumer_key,
        consumer_secret: config.yelp.consumer_secret,
        token: config.yelp.token,
        token_secret: config.yelp.token_secret
    });

    return {
        search: function (query, callback) {
            yelp.search(query, function (err, data) {
                if (err) {
                    console.log('There was a problem in yelp.search and it was', err);
                }
                callback(err, data);
            });
        }
    };
}());

module.exports = yelp;
