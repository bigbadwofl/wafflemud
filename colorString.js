var ansiColors = require('ansi-256-colors');

var colors = {
	white: [5, 5, 5],
	gray: [3, 3, 3],
	red: [5, 0, 0],
	orange: [5, 1, 0],
	green: [2, 4, 0],
	cyan: [0, 4, 4]
};

module.exports = {
	format: function(string, fg, bg) {
		var result = '';

		if (fg)
			result += ansiColors.fg.getRgb.apply(ansiColors.fg, colors[fg]);
		if (bg)
			result += ansiColors.bg.getRgb.apply(ansiColors.bg, colors[bg]);

		result += string + ansiColors.reset;

		return result;
	}
};