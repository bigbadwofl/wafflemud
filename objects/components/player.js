var messenger = require('../../messenger');

module.exports = {
	init: function() {

	},

	syncRoom: function() {
		this.sendMessage(this.obj.getRoom());
	},

	sendMessage: function(message) {
		messenger.send(this.obj.socket, message);
	},

	update: function() {
		
	},

	commands: {
		look: {
			aliases: ['l'],
			execute: function(command) {
				this.syncRoom();
			}
		}
	}
};