var f = require('../lib/module.js')
var fs = require('fs')
var stack
module.exports = function (path, cliOpts) {
	var options = {}
	var file = fs.readFileSync(path)
	stack = JSON.parse(file)

	// Clear the screen
	process.stdout.write('\x1bc')

	console.log('Each question is the back of a card. Type in what\'s on the front of the card')
	console.log('When you want to stop, just push ctrl+c and everything will be saved.')

	process.on('exit', function () {
		fs.writeFileSync(path, JSON.stringify(stack))
		console.log('Saved progress :)')
	})
	startTheQuiz(options)
}

function startTheQuiz(options) {
	f.quiz(stack, f.cliQuizzer(options), f.pick.improve).then(function (newStack) {
		stack = newStack
		startTheQuiz(options)
	})
}
