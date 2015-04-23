var util = require('util')
var gotWrong = require('../stats/got-wrong.js')
var gotRight = require('../stats/got-right.js')
var inquirer = require('inquirer')
// Polyfill promises
/* istanbul ignore next */
if (typeof Promise === 'undefined') {
	var Promise = require('bluebird')
}

// Clear the screen
var clear = function () {
	process.stdout.write('\x1bc')
}

// cliQuizzer is meant to be used like this:
// f.quiz(card, cliQuizzer({/* options */})) but it can also be used like this:
// f.quiz(card, cliQuizzer()) or even like this:
// f.quiz(card, cliQuizzer)

var cliQuizzer = function (options) {
	// If the user passed in a card instead of options, assume the defaults
	if (typeof options.front !== 'undefined') {
		return cliQuizzer({})(options)
	}
	// At this point, assume that the user has passed in some options
	/* istanbul ignore next */
	options = options || {}
	options.showAnswer = options.showAnswer || true
	options.show = options.show || 'front'
	options.answer = options.answer || 'back'
	// Return a function that will quiz the user
	return function (card) {
		return new Promise(function (resolve, reject) {
			// First, figure out showThis, x, and y
			var showThis // This is shown to the user as a prompt

			// If the user gets the card wrong and options.showAnswer is true, then cliQuizzer will print:
			//     Incorrect! "x" is "y"
			// Where "y" is the options.answer and "x" is the opposite
			var x
			var y = card[options.answer]

			if (options.show === 'both' || options.show === 'all') {
				showThis = 'Front: "' + card.front + '"\nBack: "' + card.back + '"'
				if (options.answer === 'front') {
					x = card['back']
				}
				else {
					x = card['front']
				}
			}
			else {
				showThis = card[options.show]
				x = card[options.show]
			}


			// Now actually quiz the user
			inquirer.prompt({
				type: 'input',
				name: 'question1',
				message: showThis
			}, function (answer) {
				clear()
				if (card[options.answer] === answer.question1) {
					console.log('Correct!\n')
					resolve(gotRight(card))
				}
				else {
					if (options.showAnswer) {
						console.log('Incorrect! "' + x + '" is "' + y + '"\n')
					}
					else {
						console.log('Incorrect!\n')
					}
					resolve(gotWrong(card))
				}
			})
		})
	}
}

module.exports = cliQuizzer
