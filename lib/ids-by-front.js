// Returns an array of IDs of cards in a stack which have a particular string on their front
module.exports = (stack, front) => {
  return stack.reduce((list, current, index) => {
    if (current.front === front) {
      list.push(index)
    }
    return list
  }, [])
}
