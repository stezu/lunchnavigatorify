(function ($, socketio, chat) {
    
    "use strict";

    var group = {

        init: function () {

            chat.init();

        }
    };

    window.group = group;

}(
    jQuery,
    window.socketio,
    window.chat
));