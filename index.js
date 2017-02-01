global.extend = require('extend');
global._ = require('./helpers');
_.init();

var net = require('net');
var connections = require('./connections');
var ticker = require('./ticker');
ticker.init();
var world = require('./world/world');
world.init();

global.extend = require('extend');

var server = {
	init: function() {
		net
			.createServer(this.openSocket.bind(this))
			.listen(8888);
	},

	cleanInput: function(data) {
		return data.toString().replace(/(\r\n|\n|\r)/gm, '');
	},

	receiveData: function(socket, data) {
		var cleanData = this.cleanInput(data);
		connections.receiveCommand(socket, cleanData);
	},

	openSocket: function(socket) {
		connections.connect(socket);

		socket.on('data', this.receiveData.bind(this, socket));
		socket.on('end', this.closeSocket.bind(this, socket));
	},

	closeSocket: function(socket) {
		connections.disconnect(socket);
	}
};

server.init();