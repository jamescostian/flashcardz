// Returns an array of IDs of cards in a specific stack which have a particular string on their front
module.exports = function (stackName, front) {
	return this.stacks[stackName].reduce(function (list, current, index) {
		if (current.front === front) {
			list.push(index)
		}
		return list
	}, [])
}
