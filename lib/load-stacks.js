var getList = require('./get-list.js')
var loadStack = require('./load-stack.js')

// Get all of the stacks based on config and a list of stack names.
// If the list of stack names is not provided, just grab the latest list.
module.exports = function (config, list) {
	if (typeof config === 'undefined') {
		config = this.config
	}
	if (typeof list === 'undefined') {
		list = getList(config)
	}
	var output = {}
	list.forEach(function (stackName) {
		output[stackName] = loadStack(config, stackName)
	})
	return output
}
