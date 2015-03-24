var util = require('util')
var gotWrong = require('../stats/got-wrong.js')
var gotRight = require('../stats/got-right.js')
var inquirer = require('inquirer')
// Polyfill promises
/* istanbul ignore next */
if (typeof Promise === 'undefined') {
	var Promise = require('bluebird')
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
	options.show = options.show || 'front'
	options.answer = options.answer || 'back'
	// Return a function that will quiz the user
	return function (card) {
		return new Promise(function (resolve, reject) {
			inquirer.prompt({
				type: 'input',
				name: 'question1',
				message: card[options.show]
				// TODO: allow options.show to be 'both' or 'all'
			}, function (answer) {
				if (card[options.answer] === answer.question1) {
					resolve(gotRight(card))
				}
				else {
					resolve(gotWrong(card))
				}
			})
		})
	}
}

module.exports = cliQuizzer
