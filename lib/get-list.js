var fs = require('fs')
var bluebird = require('bluebird')
var readFile = bluebird.promisify(fs.readFile)

// Get a list of all of the stacks based on a config object
// THIS IS ASYNCHRONOUS; THIS WILL RETURN A PROMISE
module.exports = function (config) {
	try {
		if (typeof config === 'undefined') {
			config = this.config
		}
		return readFile(config.path + '/stacks.list').then(function (str) {
			return JSON.parse(str.toString())
		})
	}
	catch (e) {
		/* istanbul ignore next */
		return bluebird.reject(e)
	}
}
