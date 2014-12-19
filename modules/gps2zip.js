var gps = require('gps2zip');

module.exports = function (position) {
    console.log(gps.gps2zip(position.coords.latitude, position.coords.longitude));
    
    return gps.gps2zip(position.coords.latitude, position.coords.longitude);
};