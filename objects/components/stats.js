var colorString = require('../../colorString');

module.exports = {
	values: {
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

	takeDamage: function(amount, source) {
		this.values.hp -= amount;
		if (this.values.hp <= 0) {
			this.dead = true;
			if (!this.obj.player) {
				if (this.obj.player)
					this.obj.player.sendMessage('$kill');

				this.obj.destroyed = true;
			}
			else
				this.die();
		}
	},

	resurrect: function() {
		this.dead = false;

		if (this.obj.player)
			this.obj.player.sendMessage('$resurrect');
	},

	die: function() {
		if (this.obj.player)
			this.obj.player.sendMessage('$died');

		this.obj.fireEvent('afterDeath');
	},

	commands: {
		stats: {
			aliases: ['st'],
			execute: function(command) {
				var result = '\n' + colorString.format('stats\n', 'white');
				for (var v in this.values) {
					result += colorString.format(v + ': ' + this.values[v] + '\n', 'gray');
				}

				this.obj.player.sendMessage(result);
			}
		}
	},

	events: {
		beforeAttack: function(msg) {
			if ((this.dead) && (this.obj.player)) {
				this.obj.player.sendMessage('$aredead');
				msg.failed = true;
			}
		}
	}
};