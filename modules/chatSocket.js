var Users = require('users');

module.exports = function (server) {

	var io = require('socket.io').listen(server);

	io.on('connection', function (socket) {

		console.log("There has been a new socket connection", socket);

		// emit the users as soon as someone makes a new connection
		io.sockets.emit('users updated', Users.users);

		socket.on('new user', function (user) {
			Users.addUser(user);
		});

	});

};