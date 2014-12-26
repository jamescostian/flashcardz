module.exports = function (stackName, id) {
	if (typeof id === 'string') {
		id = this.idByFront(stackName, id)
	}
	this.stacks[stackName][id].wrong += 1
}
