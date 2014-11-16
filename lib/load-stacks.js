var fs = require('fs')
var bluebird = require('bluebird')
var getList = require('./get-list.js')
var loadStack = require('./load-stack.js')
var readFile = bluebird.promisify(fs.readFile)

// Get all of the stacks based on config and a list of stack names.
// If the list of stack names is not provided, just grab the latest list.
// THIS IS ASYNCHRONOUS; THIS WILL RETURN A PROMISE
module.exports = function (config, list) {
	try {
		if (typeof config === 'undefined') {
			config = this.config
		}
		if (typeof list === 'undefined') {
			list = getList(config)
		}
		var promises = list.map(function (stackName) {
			return loadStack(config, stackName)
		})
		return bluebird.all(promises)
	}
	catch (e) {
		return bluebird.reject(e)
	}
}
