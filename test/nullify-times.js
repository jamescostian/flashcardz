module.exports = function (stackOrCard) {
  if (typeof stackOrCard.front !== 'undefined') {
    // This is a card
    return {
      front: stackOrCard.front,
      back: stackOrCard.back,
      history: stackOrCard.history.map(function (event) {
        return {
          recalled: event.recalled,
          time: null
        }
      })
    }
  } else {
    // This is a stack of cards, so put each card through this method
    // console.log(stackOrCard)
    return stackOrCard.map(module.exports)
  }
}
