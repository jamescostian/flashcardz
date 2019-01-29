const f = require('../lib/module.js')
const { readFileSync, writeFileSync } = require('fs')
let stack
let thePath
module.exports = (path, options) => {
  const file = readFileSync(path)
  stack = f.convert(JSON.parse(file.toString()), 'nice')
  thePath = path

  // Clear the screen
  process.stdout.write('\x1bc')

  console.log("Each question is the back of a card. Type in what's on the front of the card.")
  console.log('When you want to stop, just push ctrl+c and everything will be saved.')

  // Don't allow options.show to match options.answer
  if (options.show === 'back') {
    options.answer = 'front'
  }
  if (options.answer === 'front') {
    options.show = 'back'
  }

  startTheQuiz(options)
}

const pluralize = (num, noun, doNotSay1) => {
  if (num === 1 && !!doNotSay1) {
    return noun
  } else if (num === 1) {
    return num + ' ' + noun
  } else {
    return num + ' ' + noun + 's'
  }
}

const startTheQuiz = options => {
  // First, save the progress
  writeFileSync(thePath, JSON.stringify(stack))

  const oops = stack.filter(card => {
    if (card.history.length < options.acceptance) {
      return true
    }
    for (let j = card.history.length - 1; j >= card.history.length - options.acceptance; j -= 1) {
      if (!card.history[j].recalled) {
        return true
      }
    }
    return false
  }).reduce(count => count + 1, 0)
  console.log('There ' + (oops === 1 ? 'is' : 'are') + ' ' + pluralize(oops, 'card') + ' which you have not correctly recalled the last ' + pluralize(options.acceptance, 'time', true) + ' or have seen less than ' + pluralize(options.acceptance, 'time'))

  f.quiz(stack, require('../cli-quizzer')(options), f.pick.smart(options)).then(newState => {
    stack = newState
    startTheQuiz(options)
  })
}
