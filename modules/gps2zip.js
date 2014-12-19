var gps = require('gps2zip');

module.exports = function (lat, lon) {
    console.log(gps.gps2zip(lat, lon));

    return gps.gps2zip(lat, lon);
};