var normalize = require('path').normalize
var fs = require('fs')
var deepExtend = require('deep-extend')

// NB: this is 100% synchronous, yet it involves filesystem stuff.
// But extendConfig probably isn't going to be a bottle-neck, so doing this minimal filesystem stuff is fine.
module.exports = function (config) {
	config = deepExtend({
		path: '~/.flashcardz/'
	}, config)

	// Convert a leading ~ to the HOME directory
	/* istanbul ignore next */
	if (config.path.substr(0, 1) === '~') {
		config.path = process.env.HOME + config.path.substr(1)
	}

	// Normalize the path
	config.path = normalize(config.path)

	// If the config.path doesn't exist, MAKE IT
	if (!fs.existsSync(config.path)) {
		fs.mkdirSync(config.path)
	}

	// If the stack list doesn't exist, MAKE AN EMPTY ONE
	if (!fs.existsSync(config.path + '/stacks.list')) {
		fs.writeFileSync(config.path + '/stacks.list', '[]')
	}

	return config
}
