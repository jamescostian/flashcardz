module.exports = function (real, guess) {
  guess = simplify(guess)
  real = simplify(real)
  // If the two are equal (after being simplified), then return true and get on with it!
  if (guess === real) {
    return true
  }
  // If the last character was left off, let it pass
  if (real.length - guess.length === 1 && real.indexOf(guess) === 0) {
    return true
  }
  // If true hasn't been returned by now, then these two are too different. Return false
  return false
}

// Simplify strings by making them all lower case and getting rid of the first "the"/"a"/"an", as well as spaces, commas, dashes, and parentheses.
// Also, "trailing" periods/bangs/semicolons/questionmarks are removed
var simplify = module.exports.simplify = function (str) {
  str = cutOutArticles(str.toLowerCase())
  str = str.replace(/ /g, '').replace(/,/g, '').replace(/\-/g, '').replace(/\(/g, '').replace(/\)/g, '')
  var lastChar = str[str.length - 1]
  if (lastChar === '.' || lastChar === '!' || lastChar === ';' || lastChar === '?') {
    str = str.substr(0, str.length - 1)
  }
  return str
}

var cutOutArticles = function (str) {
  // First of all, if the string starts with a/an/the, cut it out!
  if (str.substr(0, 2).toLowerCase() === 'a ') {
    str = str.substr(2)
  }
  if (str.substr(0, 3).toLowerCase() === 'an ') {
    str = str.substr(3)
  }
  if (str.substr(0, 4).toLowerCase() === 'the ') {
    str = str.substr(4)
  }

  // Now get rid of a/an/the in the middle of sentences
  str = str.replace(/ the /gi, ' ').replace(/ an /gi, ' ').replace(/ a /gi, ' ')

  return str
}

module.exports.cutOutArticles = cutOutArticles
