var f = require('../lib/module.js')
var fs = require('fs')
var stack
var lastCardID = Number.MAX_VALUE
var thePath
module.exports = function (path, cliOpts) {
	var options = {}
	var file = fs.readFileSync(path)
	stack = JSON.parse(file)
	thePath = path

	// Clear the screen
	process.stdout.write('\x1bc')

	console.log('Each question is the back of a card. Type in what\'s on the front of the card')
	console.log('When you want to stop, just push ctrl+c and everything will be saved.')

	startTheQuiz(options)
}

function startTheQuiz(options) {
	// First, save the progress
	fs.writeFileSync(thePath, JSON.stringify(stack))

	// Pick from a list of cards which excludes the last card
	var pickFrom = stack.filter(function (card, id) {
		return id !== lastCardID
	})

	var newCardID = f.pick.evenHardish(pickFrom)
	if (newCardID >= lastCardID) {
		newCardID += 1
	}

	f.quiz(stack[newCardID], f.cliQuizzer(options)).then(function (newCardState) {
		stack[newCardID] = newCardState
		lastCardID = newCardID
		startTheQuiz(options)
	})
}
