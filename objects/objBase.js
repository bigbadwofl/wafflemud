var world = require('../world/world');

module.exports = {
	id: -1,

	zone: -1,
	room: -1,

	components: [],

	queue: [],

	addComponent: function(type, blueprint) {
		var template = require('./components/' + type);

		var c = extend(true, {
			obj: this,
			type: type
		}, template, blueprint);

		this.components.push(c);
		this[type] = c;

		c.init();		
	},

	getRoom: function(raw) {
		return world.getRoom(this.zone, this.room, raw, this);
	},

	setRoom: function(zone, room) {
		if (arguments.length == 1) {
			room = zone;
			zone = this.zone;
		}
		
		world.removeFromRoom(this);
		this.zone = zone;
		this.room = room;
		world.addToRoom(this);
	},

	executeCommand: function(text) {
		var splitCommand = text.split(' ');

		var components = this.components;
		var cLen = components.length;
		for (var i = 0; i < cLen; i++) {
			var c = components[i];
			var commands = c.commands;
			if (!commands)
				continue;

			var executed = false;

			for (var com in commands) {
				var command = commands[com];

				var match = (com == splitCommand[0]);
				if ((!match) && (command.aliases))
					match = command.aliases.some(a => (a == splitCommand[0]));

				if (match) {
					command.execute.call(c, text);
					executed = true;
				}
			}

			if (executed)
				break;
		}
	},

	queueCommand: function(command) {
		this.queue.push(command);
	},

	dequeueCommand: function() {
		return this.queue.pop();
	},

	update: function() {
		var command = this.dequeueCommand();
		if (command)
			this.executeCommand(command);

		var components = this.components;
		var cLen = components.length;
		for (var i = 0; i < cLen; i++) {
			var c = components[i];
			c.update();
			if (c.destroyed) {
				components.splice(i, 1);
				i--;
				cLen--;
			}
		}
	}
};