var normalize = require('path').normalize
var fs = require('fs')
var deepExtend = require('deep-extend')
var untildify = require('untildify')

module.exports = function (config) {
	config = deepExtend({
		path: '~/.flashcardz/'
	}, config)

	// Convert a leading ~ to the HOME directory
	config.path = untildify(config.path)
	// Normalize the path
	config.path = normalize(config.path)

	return config
}
