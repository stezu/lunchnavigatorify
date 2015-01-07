var db = require('./database');

var group = {

        addUserToGroupSession: function (butts, user, cb) {
            console.log("group butts", group[butts]);
            if (!group[butts]) {
                group[butts] = {
                    users: []
                };
            }

            group[butts].users.push(user);

            cb(group[butts].users);
        }
};

module.exports = group;
