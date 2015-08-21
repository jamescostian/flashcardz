var util = require('util')

// All of the converters. They take 1 argument and return data in the Flashcardz format
var converters = {
  'tab/newline': require('./tab-newline.js'),
  'objecty': require('./objecty.js'),
  'nice': require('./nice.js'),
  'single': require('./single.js')
}

module.exports = function (data, type) {
  if (typeof type === 'undefined') {
    type = util.isArray(data) ? 'nice' : 'single'
  }

  if (Object.keys(converters).indexOf(type) === -1) {
    // The type isn't recognized, throw an error
    throw new Error('flashcardz.convert received an unknown type: ' + JSON.stringify(type))
  } else if (typeof data === 'undefined') {
    // There isn't any data, return nothing
    return []
  } else {
    // There is data, and there is a type that is recognized. Put the data through the converter!
    return converters[type](data)
  }
}
