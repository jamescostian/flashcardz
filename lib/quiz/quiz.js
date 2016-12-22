const convert = require('../convert')

module.exports = (stack, quizzer, picker) => {
  if (typeof picker === 'undefined') {
    // No picker was provided, so stack must be 1 card
    return quizzer(stack)
  } else {
    const id = picker(stack)
    return quizzer(stack[id]).then(newCardState => {
      const myCopyOfStack = convert(stack, 'nice')
      myCopyOfStack[id] = newCardState
      return myCopyOfStack
    })
  }
}
