var configZones = require('./config/zones');
var colorString = require('../colorString');

module.exports = {
	zones: {},

	init: function() {
		configZones.forEach(z => this.buildZone(z));
	},

	buildZone: function(zoneNum) {
		var objects = require('../objects/objects');

		var configZone = require('./config/' + zoneNum + '/zone');
		var configRooms = require('./config/' + zoneNum + '/room');
		var configMobs = require('./config/' + zoneNum + '/mob');

		var zone = this.zones[zoneNum] = {};

		for (var r in configZone) {
			var room = configZone[r];
			var roomInfo = configRooms[(room.blueprint == null) ? r : room.blueprint];

			var builtRoom = {
				name: roomInfo.name,
				desc: roomInfo.desc,
				exits: extend(true, {}, room.exits)
			};

			var mobs = room.mobs || {};
			for (var m in mobs) {
				var mob = mobs[m];
				var mobInfo = configMobs[(mob.blueprint == null) ? m : mob.blueprint];

				var builtMob = objects.build(extend(true, {
					zone: zoneNum,
					room: r,
					components: {
						actor: {},
						npc: {}
					}
				}, mobInfo, mob));

				if (!builtRoom.contents)
					builtRoom.contents = [];

				builtRoom.contents.push(builtMob);
			}

			zone[r] = builtRoom;
		}
	},

	removeFromRoom: function(obj) {
		var room = this.zones[obj.zone][obj.room];
		if (!room.contents)
			return;

		room.contents.spliceWhere(c => (c == obj));

		room.contents
			.filter(c => !!c.player)
			.forEach(c => c.player.sendMessage(obj.name + ' left'))
	},

	addToRoom: function(obj) {
		var room = this.zones[obj.zone][obj.room];
		if (!room.contents)
			room.contents = [];

		room.contents
			.filter(c => !!c.player)
			.forEach(c => c.player.sendMessage(obj.name + ' arrived'))

		room.contents.push(obj);
	},

	getRoom: function(zone, room, raw, ignoreObject) {
		var room = this.zones[zone][room];
		if (raw)
			return room;

		var result = colorString.format(room.name, 'white') + '\n' + colorString.format(room.desc, 'gray');

		if (room.contents) {
			result += '\n';
			room.contents.forEach(function(c) {
				if (c == ignoreObject)
					return;

				result += colorString.format(c.name, 'green') + '\n';
			});
		}

		if (room.exits) {
			var exits = 'exits: ';

			for (var e in room.exits) {
				exits += (e + ' ');
			}

			result += colorString.format(exits, 'cyan');
		}

		result += '\n';

		return result;
	}
};