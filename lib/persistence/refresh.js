var loadStacks = require('./load-stacks.js')

// Refreshes all of the stacks
module.exports = function () {
	this.stacks = loadStacks.call(this, true)
}
