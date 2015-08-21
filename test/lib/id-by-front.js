var test = require('tape')
var idByFront = require('../../lib/id-by-front.js')

test('idByFront', function (t) {
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
    }
  ]

  t.equal(idByFront(cards, 'ostensible'), 0, 'found ostensible')
  t.equal(idByFront(cards, 'palpable'), 1, 'found palpable')
  t.equal(idByFront(cards, 'diaphanous'), 2, 'found diaphanous')
  t.equal(idByFront(cards, 'does not exist'), -1, "can't find does not exist")
  t.equal(idByFront(cards, 'diAphanous'), -1, "can't find diAphanous")

  t.end()
})
