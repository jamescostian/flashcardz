const idByFront = require('../lib/id-by-front.js')

describe('idByFront', () => {
  const cards = [
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

  it('works', () => {
    expect(idByFront(cards, 'ostensible')).toBe(0)
    expect(idByFront(cards, 'palpable')).toBe(1)
    expect(idByFront(cards, 'diaphanous')).toBe(2)
    expect(idByFront(cards, 'does not exist')).toBe(-1)
    expect(idByFront(cards, 'diAphanous')).toBe(-1)
  })
})
