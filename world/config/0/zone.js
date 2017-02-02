module.exports = {
	0: {
		exits: {
			n: 1,
			e: 3
		},
		mobs: {
			0: {}
		}
	},
	1: {
		exits: {
			n: 2,
			s: 0
		}
	},
	2: {
		blueprint: 1,
		exits: {
			s: 1
		}
	},
	3: {
		blueprint: 2,
		exits: {
			w: 0,
			d: 4
		},
		mobs: {
			1: {}
		}
	},
	4: {
		blueprint: 3,
		exits: {
			u: 3
		},
		objects: {
			0: {}
		},
		flags: {
			altar: true
		}
	}
};