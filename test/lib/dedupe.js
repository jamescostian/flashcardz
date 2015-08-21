var test = require('tape')
var dedupe = require('../../lib/dedupe.js')

test('dedupe', function (t) {
  var hasDupes = [
    {
      front: 'x',
      back: 'y',
      right: 3
    },
    {
      front: 'x',
      back: 'hi'
    },
    {
      front: 'x',
      back: 'y'
    }
  ]

  var noDupes = [
    {
      front: 'x',
      back: 'y',
      right: 3
    },
    {
      front: 'x',
      back: 'hi'
    }
  ]

  t.deepEqual(dedupe(hasDupes), noDupes)
  t.end()
})
