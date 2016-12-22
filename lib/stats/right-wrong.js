module.exports = (card, id) => {
  if (typeof id !== 'undefined') {
    return module.exports(card[id])
  }
  if (Array.isArray(card)) {
    // Put each card through this function and reduce to a sum of right and wrong
    return card.map(card => module.exports(card)).reduce((a, b) => {
      return {
        right: a.right + b.right,
        wrong: a.wrong + b.wrong
      }
    }, {right: 0, wrong: 0})
  }
  let wrong = 0
  let right = 0
  card.history.forEach(event => {
    if (event.recalled) {
      right += 1
    } else {
      wrong += 1
    }
  })
  return {
    right: right,
    wrong: wrong
  }
}
