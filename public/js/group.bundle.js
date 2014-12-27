(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socketio = require('./socketio');

var chat = {

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

module.exports = chat;

},{"./socketio":3}],2:[function(require,module,exports){
var chat = require('./chat');

$(document).load(function () {

	chat.init();

});

// var group = {

// 	init: function () {

// 		chat.init();

// 	}

// };

module.exports = group;

},{"./chat":1}],3:[function(require,module,exports){
var chat = require('./chat');

var socketio = {

	init: function () {

		console.log('this happens');

		var socket = io.connect("http://localhost");

		// listen for when the server updates
		// the list of current users
		socket.on('users updated', function (users) {
			chat.updateUserList(users);
		});
	}

};

module.exports = socketio;

},{"./chat":1}]},{},[2]);
