module.exports = {
	roamChance: 0.01,

	doRoam: false,

	init: function() {
		this.doRoam = this.obj.roam;
	},

	roam: function() {
		if (Math.random() >= this.roamChance)
			return;

		var room = this.obj.getRoom(true);
		var exits = Object.keys(room.exits);
		var exit = exits[~~(Math.random() * exits.length)];
		this.obj.queueCommand(exit);
	},

	update: function() {
		if ((!this.doRoam) || (this.obj.queue.length > 0))
			return;

		this.roam();
	}
};