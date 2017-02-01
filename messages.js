var colorString = require('./colorString');

var messages = {
	welcome: {
		fg: 'orange',
		msg: 'Welcome to the Waffle MUD\n'
	},
	end: {
		fg: 'green',
		msg: 'The End'
	},
	invalid: {
		fg: 'red',
		msg: 'Invalid Command'
	},
	noroom: {
		fg: 'red',
		msg: 'There is no room in that direction'
	}
};

module.exports = {
	get: function(msg) {
		var result = messages[msg.substr(1)];

		return (colorString.format(result.msg, result.fg, result.bg));
	}
};