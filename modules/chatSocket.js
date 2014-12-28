"use strict";

var Users = require('./users');

var chatSocket = {

	init: function (server) {

		var io = require('socket.io')(server);

		io.on('connection', function (socket) {

			console.log("There has been a new socket connection");

			// emit the users as soon as someone makes a new connection
			io.sockets.emit('users updated', Users.userList);

			socket.on('new user', function (user) {
				Users.addUser(user, function (userList) {
					io.sockets.emit('users updated', userList);
				});
			});

			socket.on('new message', function (data) {
				io.sockets.emit('apply new message', data);
			});

		});

		return io;
	}

};

module.exports = chatSocket;