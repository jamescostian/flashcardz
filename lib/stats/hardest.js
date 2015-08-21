var easiest = require('./easiest.js')

module.exports = function (stack, count, key) {
  return easiest(stack, count, key, true) // The true makes the "easiest" function reverse the order so that the hardest come first
}
