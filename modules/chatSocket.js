var chatSocket = (function () {
    "use strict";

    var users = require('./users');

    return {

        init: function (server) {

            var io = require('socket.io')(server);

            io.on('connection', function (socket) {

                console.log("There has been a new socket connection");

                // emit the users as soon as someone makes a new connection
                io.sockets.emit('users updated', users.userList);

                socket.on('new user', function (user) {
                    users.addUser(user, function (userList) {
                        io.sockets.emit('users updated', userList);
                    });
                });

                socket.on('new message', function (data) {
                    io.sockets.emit('apply new message', data);
                });

            });

            return io;
        }
    };
}());

module.exports = chatSocket;
