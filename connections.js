var messenger = require('./messenger');
var objects = require('./objects/objects');
var world = require('./world/world');

module.exports = {
	list: [],

	connect: function(socket) {
		var player = objects.build({
			socket: socket,

			zone: 0,
			room: 0,

			name: 'player',

			components: {
				combat: {},
				actor: {},
				player: {},
				inventory: {},
				stats: {}
			}
		});

		world.addToRoom(player);

		this.list.push(player);

		messenger.send(socket, '$welcome');
		player.player.syncRoom();	
	},

	receiveCommand: function(socket, command) {
		this.list.find(l => (l.socket == socket)).queueCommand(command);
	},

	disconnect: function(socket) {
		this.list.spliceWhere(s => s == socket);
	}
};