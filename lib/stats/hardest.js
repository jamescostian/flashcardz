const easiest = require('./easiest.js')

module.exports = (stack, count, key) => easiest(stack, count, key, true) // The true makes the "easiest" function reverse the order so that the hardest come first
