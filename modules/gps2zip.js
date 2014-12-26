var gps = require('gps2zip');

module.exports = function (lat, lon) {
    return gps.gps2zip(lat, lon);
};