var db = require('./database');

var Groups = {

    addGroup: function (group) {
        db.save('groups', {}, function (err, results) {});
    },

    addUser: function (group, user, cb) {
        this.userList.push(user);

        console.log('addUser has been called', user);

        cb(this.userList);

    }

};

module.exports = Groups;
