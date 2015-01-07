(function ($, socketio) {

    "use strict";

    var chat = {

		$chatMessage: $('.message'),
		$chatz: $('.chatz'),
		$sendButton: $('.send-message'),
		namespace: window.location.pathname.split('/')[2],

        init: function () {

            var self = this,
                currentUser = $('.site-header__account__name--first').text();

            // any initialization steps necessary for chat goes here
			window.socketio.init(this.namespace);

            self.$sendButton.on('click', function () {
                if (self.$chatMessage.val()) {

                	// console.log(window.socketio.socket);

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
                $userList.append('<li>' + users[i] + '</li>');
            }
        }

    };

    window.chat = chat;

}(
    jQuery,
    window.socketio
));
