var inquirer = require('inquirer')
var cardID = 0
/* istanbul ignore next */
module.exports = function (stackName) {
	var that = this
	// Show the back of a card
	inquirer.prompt({
		type: 'input',
		name: 'x',
		message: that.stacks[stackName][cardID].back
	}, function (answer) {
		if (that.stacks[stackName][cardID].front === answer.x) {
			that.gotRight(stackName, cardID)
		}
		else {
			that.gotWrong(stackName, cardID)
		}

		// Go to the next card
		cardID += 1
		// If the card does not exist (because the ID is too high), go back to the first card (index 0)
		if (that.stacks[stackName].length <= cardID) {
			cardID = 0
		}

		that.quiz(stackName)
	}.bind(that))
}
