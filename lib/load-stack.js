var fs = require('fs')
var basename = require('path').basename
var bluebird = require('bluebird')
var readFile = bluebird.promisify(fs.readFile)

// Return the JS array from the stack file based on the stack's name and the config object.
// THIS IS ASYNCHRONOUS; THIS WILL RETURN A PROMISE
module.exports = function (config, stackName) {
	try {
		if (typeof config === 'undefined') {
			config = this.config
		}
		var stackFileName = basename(stackName) + '.stack'
		var stackString = readFile(config.path + '/' + stackFileName)
		return stackString.then(function (str) {
			return JSON.parse(str.toString())
		})
	}
	catch (e) {
		return bluebird.reject(e)
	}
}
