(function (chat) {
	
	"use strict";

	var socketio = {

		socket: io.connect(location.origin),

		init: function (namespace) {

			var nsp = io.of('/' + namespace);

			// listen for when the server updates
			// the list of current users
			nsp.on('users updated', function (users) {
				chat.updateUserList(users);
			});

			nsp.on('apply new message', function (data) {
				chat.addMessage(data);
			});
		}

	};

	window.socketio = socketio;

}(
	window.chat
));
