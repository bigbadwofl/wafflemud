var messages = require('./messages');

module.exports = {
	send: function(socket, msg, fg, bg) {
		if (msg[0] == '$')
			msg = messages.get(msg);

		socket.write(msg + `\n`);
	}
};