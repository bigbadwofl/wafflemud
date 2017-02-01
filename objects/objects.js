var objBase = require('./objBase');

module.exports = {
	objects: [],
	nextId: 0,

	build: function(blueprint) {
		blueprint = blueprint || {};
		var components = blueprint.components || {};
		delete blueprint.components;

		var obj = extend(true, {
			id: this.nextId++
		}, objBase, blueprint);

		for (var c in components) {
			obj.addComponent(c, components[c]);
		}

		this.objects.push(obj);

		return obj;
	},

	update: function() {
		var objects = this.objects;
		var oLen = objects.length;
		for (var i = 0; i < oLen; i++) {
			var o = objects[i];
			o.update();
			if (o.destroyed) {
				objects.splice(i, 1);
				i--;
				oLen--;
			}
		}
	}
};