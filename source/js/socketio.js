(function (chat) {

    "use strict";

    var socketio = {

        socket: null,

		init: function (namespace) {

			var nsp = io('/' + namespace);
			this.socket = nsp;

			// listen for when the server updates
			// the list of current users
			nsp.on('users updated', function (users) {
				chat.updateUserList(users);
			});

			nsp.on('apply new message', function (data) {
				chat.addMessage(data);
			});

			nsp.emit('new message', { fuck: 'fuck' });

		}

    };

    window.socketio = socketio;

}(
    window.chat
));
