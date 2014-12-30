var gps2zip = (function () {
    "use strict";

    var gps = require('gps2zip');

    return function (lat, lon) {
        return gps.gps2zip(lat, lon);
    };
}());

module.exports = gps2zip;
