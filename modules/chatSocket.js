var groups = require('./group');

var chatSocket = {

    io: null,

    nsp: null,

    init: function (server) {

        chatSocket.io = require('socket.io')(server);

        chatSocket.io.on('connection', function (socket) {
            console.log("There has been a new socket connection");
        });

        return chatSocket.io;
    },

    newGroup: function (group) {

        chatSocket.nsp = this.io.of('/' + group);

        console.log('a new namespace hath been created and its /' + group);

        chatSocket.nsp.on('connection', function (socket) {
            console.log('there has been a new connection to the nizzity namespace' + group);
            chatSocket.nsp.emit('users updated', groups[group].users);
        });

        // emit the users as soon as someone makes a new connection

        // nsp.on('new user', function (user) {
        //     groups.addUser(group, user, function (userList) {
        //         nsp.emit('users updated', userList);
        //     });
        // });

        chatSocket.nsp.on('new message', function (data) {
            chatSocket.nsp.emit('apply new message', data);
        });
    },

    newConnection: function (group, user) {
        console.log('newConnection called with user', user);
        chatSocket.nsp.emit('new connection to nsp', user);

        groups.addUserToGroupSession(group, user, function (userList) {
            console.log("userList in newConnection", userList);
            // chatSocket.nsp.emit('users updated', userList);
        });
    },

    groupExists: function (group) {
        return chatSocket.nsp ? chatSocket.nsp.server.nsps['/' + group] : 0;
    }

};

module.exports = chatSocket;
