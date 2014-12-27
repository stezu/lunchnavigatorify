"use strict";

var Users = require('./users');

var chatSocket = {

	init: function (server) {

		var io = require('socket.io')(server);

		io.on('connection', function (socket) {

			console.log("There has been a new socket connection", socket);

			// emit the users as soon as someone makes a new connection
			io.sockets.emit('users updated', Users.userList);

			socket.on('new user', function (user) {
				Users.addUser(user);
			});

		});

		return io;
	}

};

module.exports = chatSocket;