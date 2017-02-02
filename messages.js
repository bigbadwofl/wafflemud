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
	kill: {
		fg: 'green',
		msg: 'You killed $1'
	},
	invalid: {
		fg: 'red',
		msg: 'Invalid Command'
	},
	notarget: {
		fg: 'red',
		msg: `You don't see them here`
	},
	noattack: {
		fg: 'red',
		msg: `How would you attack that?`
	},
	sametarget: {
		fg: 'red',
		msg: `You're doing your best`
	},
	noroom: {
		fg: 'red',
		msg: 'There is no room in that direction'
	},
	aredead: {
		fg: 'red',
		msg: `You can't do that while dead`
	},
	died: {
		fg: 'red',
		msg: `You died`
	},
	resurrect: {
		fg: 'orange',
		msg: `Your life returns to your body`
	}
};

module.exports = {
	get: function(msg) {
		var result = messages[msg.substr(1)];

		var aLen = arguments.length;
		for (var i = 1; i < aLen; i++) {
			result = result.split('$' + 1).join(arguments[i]);
		}

		return (colorString.format(result.msg, result.fg, result.bg));
	}
};