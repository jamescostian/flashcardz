var normalize = require('path').normalize
var fs = require('fs')
var deepExtend = require('deep-extend')

module.exports = function (config) {
	config = deepExtend({
		path: '~/.flashcardz/'
	}, config)

	// Convert a leading ~ to the HOME directory
	if (config.path.substr(0, 1) === '~') {
		config.path = process.env.HOME + config.path.substr(1)
	}

	// Normalize the path
	config.path = normalize(config.path)

	return config
}
