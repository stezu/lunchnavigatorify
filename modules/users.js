"use strict";

var users = {

	userList: [],

	addUser: function (user) {
		userList.push(user);

		return userList;
	}

};

module.exports = users;