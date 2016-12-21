const dedupe = require('../lib/dedupe.js')

it('dedupe', () => {
  const hasDupes = [
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

  const noDupes = [
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

  expect(dedupe(hasDupes)).toEqual(noDupes)
})
