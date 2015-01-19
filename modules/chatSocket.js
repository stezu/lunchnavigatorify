var groups = require('./group');

var chatSocket = {

    io: null,

    nsp: null,

    init: function (server) {

        chatSocket.io = require('socket.io').listen(server);

        chatSocket.io.on('connection', function (socket) {
            console.log("There has been a new socket connection");
        });

        return chatSocket.io;
    },

    newGroup: function (group) {

        chatSocket.nsp = this.io.of('/' + group);

        console.log('A new namespace has been created for: ' + group);

        chatSocket.nsp.on('connection', function (socket) {
            console.log('There has been a new connection to the namespace:', group);

            socket.emit('users updated', groups[group].users);

            socket.on('new message', function (data) {
                console.log('New message has been hollered at', data);
                socket.emit('apply new message', data);
            });

            // emit the users as soon as someone makes a new connection
            socket.on('new user', function (user) {
                groups.addUser(group, user, function (userList) {
                    socket.emit('users updated', userList);
                });
            });

            socket.on('disconnect', function () {
                groups.removeUser(group, socket.handshake.user, function (userList) {
                    socket.emit('users updated', userList);
                });
            });

        });
    },

    newConnection: function (group, user) {
        chatSocket.nsp.emit('new connection to nsp', user);

        groups.addUser(group, user);
    },

    groupExists: function (group) {
        return chatSocket.nsp ? chatSocket.nsp.server.nsps['/' + group] : 0;
    }

};

module.exports = chatSocket;
