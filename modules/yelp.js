var config = require('../appconfig');

var yelp = require('yelp').createClient({
    consumer_key: config.yelp.consumer_key,
    consumer_secret: config.yelp.consumer_secret,
    token: config.yelp.token,
    token_secret: config.yelp.token_secret
});

exports.search = function (query, callback) {
    // we can totally make this super robust so you can pass an object with any number of options and
    // we can loop through the names and match them to their values
    // this will make for a nice interface with tons of options
    yelp.search({
        category_filter: query.category_filter,
        term: query.term,
        location: query.location,
        limit: query.limit,
        location: 33612
    }, function (err, data) {
        if (err) {
            console.log('There was a problem in yelp.search and it was', err);
        }
        callback(err, data);
    });
};