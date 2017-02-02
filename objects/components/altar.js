module.exports = {
	init: function() {

	},

	update: function() {

	},

	commands: {
		pray: {
			aliases: ['pr'],
			execute: function(command, source) {
				if (!source.stats.dead)
					return;

				source.stats.resurrect(this.obj);
			}
		}
	}
};