var objects = require('./objects/objects');

module.exports = {
	delay: 1000,

	init: function() {
		setTimeout(this.tick.bind(this), this.delay);
	},

	tick: function() {
		objects.update();

		setTimeout(this.tick.bind(this), this.delay);
	}
};