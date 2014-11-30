var fs = require('fs')

// Get a list of all of the stacks based on a config object
module.exports = function (config) {
	if (typeof config === 'undefined') {
		config = this.config
	}
	return JSON.parse(fs.readFileSync(config.path + '/stacks.list').toString())
}
