var chat = require('./chat');

var socketio = {

	init: function () {

		console.log('this happens');

		var socket = io.connect("http://localhost");

		// listen for when the server updates
		// the list of current users
		socket.on('users updated', function (users) {
			chat.updateUserList(users);
		});
	}

};

module.exports = socketio;
