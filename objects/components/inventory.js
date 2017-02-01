var colorString = require('../../colorString');

module.exports = {
	items: [],

	init: function() {

	},

	update: function() {

	},

	commands: {
		inventory: {
			aliases: ['i'],
			execute: function(command) {
				var items = this.items;

				var result = '\n' + colorString.format('inventory\n', 'white');
				if (items.length == 0)
					result += colorString.format('empty', 'gray');
				else
					items.forEach(i => (result += colorString.format(i.name, 'gray')));

				result += '\n';

				this.obj.player.sendMessage(result);
			}
		}
	}
};