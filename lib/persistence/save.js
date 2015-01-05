var fs = require('fs')
var basename = require('path').basename

module.exports = function (stackName, stack) {
	var path = this.config.path

	if (!fs.existsSync(path)) {
		fs.mkdirSync(path)
	}

	if (typeof stackName === 'undefined') {
		// Delete all of the old stacks
		this.getList().forEach(function (name) {
			fs.unlinkSync(path + '/' + name + '.flashcardz-stack')
		})

		// Save each stack
		var s = this.save.bind(this)
		Object.keys(this.stacks).forEach(function (stackName) {
			s(stackName)
		})
	}
	else if (typeof stack === 'undefined') {
		// No stack was provided, so find the stack and then try again
		return this.save(stackName, this.stacks[stackName])
	}
	else {

		// Save a single stack
		fs.writeFileSync(path + '/' + basename(stackName) + '.flashcardz-stack', JSON.stringify(stack))
	}
}
