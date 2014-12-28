(function ($, socketio) {

	"use strict";

	var chat = {

		$chatWindow: $('.chat-window'),
		$chatContent: $('.chat-content'),
		$chatMessage: $('.message'),
		$chatz: $('.chatz'),
		$sendButton: $('.send-message'),

		init: function () {

			var self = this,
				currentUser;

			// any initialization steps necessary for chat goes here

			window.socketio.init();

			self.$chatWindow.hide();

			$('.submit-username').on('click', function () {
				if ($('.username').val()) {

					currentUser =  $('.username').val();

					$('.chat-login').hide();

					window.socketio.socket.emit('new user', { username: $('.username').val() });

					self.$chatWindow.show();
				} else {
					alert('put in a name');
				}
			});

			self.$sendButton.on('click', function () {
				if (self.$chatMessage.val()) {

					window.socketio.socket.emit('new message', { username: currentUser, message: self.$chatMessage.val() });

					self.$chatMessage.val('');

				} else {
					alert('put in a message');
				}
			});
		},

		addMessage: function (data) {
			var self = this;

			self.$chatz.append('<li><span class="name">' + data.username + '</span>: ' + data.message + '</li>');
		},

		updateUserList: function (users) {

			var $userList = $('.current-users');

			$userList.empty();

			for (var i = 0, len = users.length; i < len; i ++) {
				$userList.append('<li>' + users[i].username + '</li>');
			}
		}

	};

	window.chat = chat;

}(
	jQuery,
	window.socketio
));
