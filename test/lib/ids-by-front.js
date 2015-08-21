var test = require('tape')
var idsByFront = require('../../lib/ids-by-front.js')

test('idsByFront', function (t) {
  var cards = [
    {
      front: 'ostensible',
      back: 'stated or appearing to be true, but not necessarily so.',
      right: 5,
      wrong: 1
    },
    {
      front: 'palpable',
      back: 'able to be touched or felt.',
      right: 9,
      wrong: 6
    },
    {
      front: 'diaphanous',
      back: '(especially of fabric) light, delicate, and translucent.',
      right: 7,
      wrong: 2
    },
    {
      front: 'thing',
      back: 'able to be touched or felt.',
      right: 9,
      wrong: 6
    },
    {
      front: 'not thing',
      back: 'able to be touched or felt.',
      right: 9,
      wrong: 6
    },
    {
      front: 'thing',
      back: 'able to be touched or felt.',
      right: 9,
      wrong: 6
    },
    {
      front: 'thing',
      back: 'a ling a ling',
      right: 3,
      wrong: 2
    }
  ]

  t.deepEqual(idsByFront(cards, 'ostensible'), [0], 'found ostensible')
  t.deepEqual(idsByFront(cards, 'palpable'), [1], 'found palpable')
  t.deepEqual(idsByFront(cards, 'diaphanous'), [2], 'found diaphanous')
  t.deepEqual(idsByFront(cards, 'thing'), [3, 5, 6], 'found thing 3 times')
  t.equal(idsByFront(cards, 'does not exist').length, 0, "can't find does not exist")
  t.equal(idsByFront(cards, 'diAphanous').length, 0, "can't find diAphanous")

  t.end()
})
