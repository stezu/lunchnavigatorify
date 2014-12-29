"use strict";

var users = {

    userList: [],

    addUser: function (user, cb) {
        this.userList.push(user);

        console.log('addUser has been called', user);

        cb(this.userList);
    }

};

module.exports = users;