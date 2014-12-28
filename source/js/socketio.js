(function (chat) {
	
	"use strict";

	var socketio = {

		socket: io.connect("http://localhost"),

		init: function () {

			// listen for when the server updates
			// the list of current users
			this.socket.on('users updated', function (users) {
				chat.updateUserList(users);
			});

			this.socket.on('apply new message', function (data) {
				chat.addMessage(data);
			});
		}

	};

	window.socketio = socketio;

}(
	window.chat
));
