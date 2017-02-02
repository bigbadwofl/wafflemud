module.exports = {
	target: null,
	inCombat: false,

	attacking: [],

	init: function() {

	},

	update: function() {
		if (!this.inCombat)
			return;

		this.target.stats.takeDamage(1, this.obj);
	},

	stopAttacking: function(target) {
		this.attacking.spliceWhere(a => (a == target));
		if (target == this.target) 
			this.target = (this.attacking.length > 0) ? this.attacking[0]: null;
		this.inCombat = (this.attacking.length > 0);
	},

	commands: {
		kill: {
			aliases: ['k'],
			execute: function(command) {
				var msg = {};
				this.obj.fireEvent('beforeAttack', msg);
				if (msg.failed)
					return;

				var room = this.obj.getRoom(true);

				var splitCommand = command.split(' ');
				var target = room.contents.find(c => (c.name.toLowerCase() == splitCommand[1].toLowerCase()));

				if (!target) {
					if (this.obj.player)
						this.obj.player.sendMessage('$notarget');

					return;
				} else if (!target.combat) {
					if (this.obj.player)
						this.obj.player.sendMessage('$noattack');

					return;
				} else if (this.target == target) {
					this.obj.player.sendMessage('$sametarget');
					return;
				}

				if (!this.attacking.some(a => (a == target))) {
					this.attacking.push(target);
					target.combat.commands.kill.execute.call(target.combat, 'k ' + this.obj.name);
				}

				this.inCombat = true;

				this.target = target;
			}
		}
	},

	events: {
		afterDeath: function() {
			this.attacking.forEach(a => a.combat.stopAttacking(this.obj), this);

			this.inCombat = false;
			this.target = null
			this.attacking = [];
		}
	}
};