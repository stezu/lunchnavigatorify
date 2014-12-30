var group = (function () {
    "use strict";

    var db = require('./database');

    return {

        addGroup: function (group) {
            db.save('groups', {}, function (err, results) {});
        },

        addUser: function (group, user, cb) {
            this.userList.push(user);

            console.log('addUser has been called', user);

            cb(this.userList);
        }
    };
}());

module.exports = group;
