var fs = require('fs')
var basename = require('path').basename
var save

save = module.exports = function (config, stackName, stack) {
	if (typeof config === 'string') {
		return save.call(this, undefined, config, stackName)
	}
	if (typeof config === 'undefined') {
		config = this.config
	}
	if (typeof stackName === 'undefined') {
		// Purge the list of stacks, and then save all of the stacks
		fs.writeFileSync(config.path + '/stacks.list', '[]')
		Object.keys(this.stacks).forEach(function (stackName) {
			save.call(this, config, stackName, this.stacks[stackName])
		}, this)
	}
	else {
		// Save a single stack
		if (typeof stack === 'undefined') {
			stack = this.stacks[stackName]
		}
		fs.writeFileSync(config.path + '/' + basename(stackName) + '.stack', JSON.stringify(stack))

		var list = this.getList()
		if (list.indexOf(stackName) === -1) {
			// Stack is not listed; add it to the list
			list.push(stackName)
			fs.writeFileSync(config.path + '/stacks.list', JSON.stringify(list))
		}
	}
}
