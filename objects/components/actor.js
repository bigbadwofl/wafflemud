var messenger = require('../../messenger');

module.exports = {
	init: function() {

	},

	update: function() {

	},

	commands: {
		move: {
			aliases: ['n', 'e', 's', 'w', 'u', 'd'],
			execute: function(command) {
				var room = this.obj.getRoom(true);
				var newRoom = room.exits[command];
				if (newRoom != null) {
					this.obj.setRoom(newRoom);
					if (this.obj.player)
						this.obj.player.syncRoom();
				}
				else if (this.obj.player)
					messenger.send(this.obj.socket, '$noroom');
			}
		}
	}
};