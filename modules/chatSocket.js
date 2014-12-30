"use strict";

var Users = require('./users');

var chatSocket = {

	io: null,

	init: function (server) {

		this.io = require('socket.io')(server);

		this.io.on('connection', function (socket) {

			console.log("There has been a new socket connection");

		});

		return this.io;
	},

	newGroup: function (group) {

		var nsp = this.io.of('/' + group);

		// emit the users as soon as someone makes a new connection
		nsp.sockets.emit('users updated', Users.userList);

		nsp.on('new user', function (user) {
			Users.addUser(user, function (userList) {
				nsp.emit('users updated', userList);
			});
		});

		nsp.on('new message', function (data) {
			nsp.emit('apply new message', data);
		});

	}

};

module.exports = chatSocket;