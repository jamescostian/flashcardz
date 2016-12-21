const idsByFront = require('../lib/ids-by-front.js')

describe('idsByFront', () => {
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
  it('works', () => {
    expect(idsByFront(cards, 'ostensible')).toEqual([0])
    expect(idsByFront(cards, 'palpable')).toEqual([1])
    expect(idsByFront(cards, 'diaphanous')).toEqual([2])
    expect(idsByFront(cards, 'thing')).toEqual([3, 5, 6])
    expect(idsByFront(cards, 'does not exist').length).toBe(0)
    expect(idsByFront(cards, 'diAphanous').length).toBe(0)
  })
})
