module.exports = {
	init: function() {

	},

	update: function() {

	},

	commands: {
		kill: {
			aliases: ['k'],
			execute: function(command) {
				var room = this.obj.getRoom(true);

				var splitCommand = command.split(' ');
				var target = room.contents.find(c => (c.name.toLowerCase() == splitCommand[1].toLowerCase()));
				
				
			}
		}
	}
};