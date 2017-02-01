var colorString = require('../../colorString');

module.exports = {
	stats: {
		level: 1,
		hp: 10,
		hpMax: 10,
		mana: 10,
		manaMax: 10,
		str: 1,
		int: 1,
		dex: 1,
		con: 1,
		spi: 1
	},

	init: function() {

	},

	update: function() {

	},

	commands: {
		stats: {
			aliases: ['st'],
			execute: function(command) {
				var result = '\n' + colorString.format('stats\n', 'white');
				for (var s in this.stats) {
					result += colorString.format(s + ': ' + this.stats[s] + '\n', 'gray');
				}

				this.obj.player.sendMessage(result);
			}
		}
	}
};