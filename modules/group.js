var db = require('./database');

var group = {

    addUser: function (groupName, user, cb) {
        console.log(groupName, 'members:', group[groupName]);

        if (!group[groupName]) {
            group[groupName] = {
                users: []
            };
        }

        group[groupName].users.push(user);

        if (cb) {
            cb(group[groupName].users);
        }
    },

    removeUser: function (groupName, user, cb) {
        var index = group[groupName].users.indexOf(user);

        if (index > -1) {
            group[groupName].users.splice(index, 1);
        }

        if (cb) {
            cb(group[groupName].users);
        }
    }
};

module.exports = group;
