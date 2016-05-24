var gotWrong = require('./lib/stats/got-wrong.js')
var gotRight = require('./lib/stats/got-right.js')
var checkAnswer = require('./lib/quiz/check-answer.js')
var inquirer = require('inquirer')

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
    // First, figure out showThis, x, and y
    var showThis // This is shown to the user as a prompt

    // If options.showAnswer is true, then cliQuizzer may print:
    //     Correct! "x" matches "y"
    // Where "y" is the options.answer and "x" is the opposite
    var x
    var y = card[options.answer]

    if (options.show === 'both' || options.show === 'all') {
      showThis = 'Front: "' + card.front + '"\n  Back: "' + card.back + '"'
      if (options.answer === 'front') {
        x = card['back']
      } else {
        x = card['front']
      }
    } else {
      showThis = card[options.show]
      x = card[options.show]
    }

    // Now actually quiz the user
    return inquirer.prompt({
      type: 'input',
      name: 'q',
      message: showThis + '\n '
    }).then(function (answer) {
      clear()
      if (checkAnswer(card[options.answer], answer.q)) {
        if (options.showAnswer) {
          console.log('\x1b[32;1mCorrect\x1b[0m! "' + x + '" matches "' + y + '"')
        } else {
          console.log('\x1b[32;1mCorrect\x1b[0m!')
        }
        return gotRight(card)
      } else {
        if (options.showAnswer) {
          console.log('\x1b[31;1mIncorrect\x1b[0m! "' + x + '" matches "' + y + '", not "' + answer.q + '"')
        } else {
          console.log('\x1b[31;1mIncorrect\x1b[0m!')
        }
        return gotWrong(card)
      }
    })
  }
}

module.exports = cliQuizzer
