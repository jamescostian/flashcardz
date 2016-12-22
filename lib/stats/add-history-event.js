const convert = require('../convert')
module.exports = (stack, id, recalled, time) => {
  if (!Array.isArray(stack)) {
    // The "stack" is actually just one single card
    return module.exports([stack], 0, id, recalled)[0]
  } else {
    const newStack = convert(stack, 'nice')
    newStack[id].history.push({
      recalled: recalled,
      time: time || new Date()
    })
    return newStack
  }
}
