var fs = require('fs')
var basename = require('path').basename

// Return the JS array from the stack file based on the stack's name and the config object.
module.exports = function (config, stackName) {
	if (typeof stackName === 'undefined') {
		stackName = config
		config = this.config
	}
	var stackFileName = basename(stackName) + '.stack'
	var stackString = fs.readFileSync(config.path + '/' + stackFileName)
	var x = JSON.parse(stackString.toString())
	return x
}
