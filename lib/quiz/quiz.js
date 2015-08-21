var convert = require('../convert')

module.exports = function (stack, quizzer, picker) {
  if (typeof picker === 'undefined') {
    // No picker was provided, so stack must be 1 card
    return quizzer(stack)
  } else {
    var id = picker(stack)
    return quizzer(stack[id]).then(function (newCardState) {
      var myCopyOfStack = convert(stack, 'nice')
      myCopyOfStack[id] = newCardState
      return myCopyOfStack
    })
  }
}
