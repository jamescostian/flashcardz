// Get all of the stacks
// If the list of stack names is not provided, just grab the latest list.
module.exports = function (reloadList) {
	var list
	if (reloadList) {
		list = this.getList()
	}
	else {
		list = Object.keys(this.stacks)
	}

	var output = {}

	var loadStack = this.loadStack.bind(this)
	list.forEach(function (stackName) {
		output[stackName] = loadStack(stackName)
	})

	return output
}
