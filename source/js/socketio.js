(function (chat) {

    "use strict";

    var socketio = {

        socket: null,

		init: function (namespace) {

			this.socket = io.connect('/' + namespace);

			// listen for when the server updates
			// the list of current users
			this.socket.on('users updated', function (users) {
				chat.updateUserList(users);
			});

			this.socket.on('apply new message', function (data) {
				chat.addMessage(data);
			});

			this.socket.emit('new message', { username: 'stephen', message: 'test message' });

		}

    };

    window.socketio = socketio;

}(
    window.chat
));
