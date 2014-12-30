var db = require('./database');

var Groups = {

	userList: [],

	addGroup: function (group) {
		db.save('groups', {}, function (err, results) {});
	},

	addUser: function (user, cb) {
		this.userList.push(user);

		console.log('addUser has been called', user);

		cb(this.userList);
	}

};

module.exports = users;