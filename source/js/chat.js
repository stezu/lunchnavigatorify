(function ($, socketio) {

	"use strict";

	var chat = {

		$app: $('.app'),

		init: function () {

			// any initialization steps necessary for chat goes here

			socketio.init();

		},

		updateUserList: function (users) {

			var $userList = $('.current-users');

			$userList.empty();

			for (var i = 0, len = users.length; i < len; i ++) {
				$userList.append('<li>' + users[i].name + '</li>');
			}
		}

	};

	window.chat = chat;

}(
	jQuery,
	window.socketio
));
