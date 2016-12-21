const gotRight = require('../lib/stats/got-right.js')
const gotWrong = require('../lib/stats/got-wrong.js')
const easiest = require('../lib/stats/easiest.js')
const hardest = require('../lib/stats/hardest.js')
const sort = require('../lib/stats/sort.js')
const pick = require('../lib/stats/pick.js')
const rightWrong = require('../lib/stats/right-wrong.js')
const convert = require('../lib/convert')
const makeHistory = require('./make-history.js')
const nullifyTimes = require('./nullify-times.js')

describe('stats', () => {
  let input, expected
  beforeEach(() => {
    input = [
      {
        front: 'ostensible',
        back: 'stated or appearing to be true, but not necessarily so.',
        history: makeHistory(5, 1)
      },
      {
        front: 'palpable',
        back: 'able to be touched or felt.',
        history: makeHistory(9, 6)
      },
      {
        front: 'diaphanous',
        back: '(especially of fabric) light, delicate, and translucent.',
        history: makeHistory(7, 2)
      }
    ]
    // expected is the expected output for ALL OF THE SORTING ALGORITHMS.
    // The input was specifically picked so that only 1 expected output would be required.
    expected = [
      {// hardness = 1/6
        front: 'ostensible',
        back: 'stated or appearing to be true, but not necessarily so.',
        history: makeHistory(5, 1)
      },
      {// hardness = 2/9
        front: 'diaphanous',
        back: '(especially of fabric) light, delicate, and translucent.',
        history: makeHistory(7, 2)
      },
      {// hardness = 6/15
        front: 'palpable',
        back: 'able to be touched or felt.',
        history: makeHistory(9, 6)
      }
    ]
  })

  describe('sort', () => {
    it('works when sorting by missesAscending', () => {
      let actual = convert(input, 'nice').sort(sort.missesAscending)
      expect(nullifyTimes(actual)).toEqual(nullifyTimes(expected))
    })
    it('works when sorting by hitsAscending', () => {
      let actual = convert(input, 'nice').sort(sort.hitsAscending)
      expect(nullifyTimes(actual)).toEqual(nullifyTimes(expected))
    })
    it('works when sorting by hardnessAscending', () => {
      let actual = convert(input, 'nice').sort(sort.hardnessAscending)
      expect(nullifyTimes(actual)).toEqual(nullifyTimes(expected))
    })
    it('works when sorting by timesSeenAscending', () => {
      let actual = convert(input, 'nice').sort(sort.timesSeenAscending)
      expect(nullifyTimes(actual)).toEqual(nullifyTimes(expected))
    })
    it('works when sorting multiple cards with {right: 0, wrong: 0} by hardnessAscending', () => {
      input[0].history = makeHistory(0, 0)
      input[1].history = makeHistory(0, 0)
      expected[0].history = makeHistory(0, 0)
      expected[2].history = makeHistory(0, 0)
      const actual = convert(input, 'nice').sort(sort.hardnessAscending)
      expect(nullifyTimes(actual[2])).toEqual(nullifyTimes(expected[2]))
    })
    it('works when sorting multiple cards with new histories by hardnessAscending', () => {
      input[0].history = makeHistory(5, 1)
      input[1].history = makeHistory(9, 6)
      expected[0].history = makeHistory(5, 1)
      expected[2].history = makeHistory(9, 6)

      expect(sort.hardnessAscending(input[2], {
        front: 'xyz',
        back: 'something else',
        history: makeHistory(0, 0)
      }) < 0).toBe(true)
    })
  })
  describe('pick', () => {
    it('works', () => {
      // For random and shuffle (they're the same), test whether the returned value exists in the stack
      let actual = pick.random(input)
      expect(actual < input.length && actual >= 0).toBe(true)
      actual = pick.shuffle(input)
      expect(actual < input.length && actual >= 0).toBe(true)

      actual = pick.even(input)
      expect(actual).toBe(0)
      actual = pick.easy(input)
      expect(actual).toBe(0)
      actual = pick.hard(input)
      expect(actual).toBe(1)
    })
  })
  describe('hardest', () => {
    it('works given no extra input', () => {
      expect(nullifyTimes(hardest(input))).toEqual(nullifyTimes(expected[2]))
    })
    it('works when explicitly told to get the #1 hardest', () => {
      expect(nullifyTimes(hardest(input, 1))).toEqual(nullifyTimes(expected[2]))
    })
    it('works when told to get the 2 hardest cards', () => {
      expect(nullifyTimes(hardest(input, 2))).toEqual(nullifyTimes([expected[2], expected[1]]))
    })
    it('works when told to get a specific attribute (e.g. front), with or without a number of results', () => {
      expect(hardest(input, 'front')).toEqual(expected[2].front)
      expect(hardest(input, 2, 'front')).toEqual([expected[2].front, expected[1].front])
    })
  })
  describe('easiest', () => {
    it('works given no extra input', () => {
      expect(nullifyTimes(easiest(input))).toEqual(nullifyTimes(expected[0]))
    })
    it('works when explicitly told to get the #1 easiest', () => {
      expect(nullifyTimes(easiest(input, 1))).toEqual(nullifyTimes(expected[0]))
    })
    it('works when told to get the 2 easiest cards', () => {
      expect(nullifyTimes(easiest(input, 2))).toEqual(nullifyTimes([expected[0], expected[1]]))
    })
    it('works when told to get a specific attribute (e.g. front), with or without a number of results', () => {
      expect(easiest(input, 'front')).toEqual(expected[0].front)
      expect(easiest(input, 2, 'front')).toEqual([expected[0].front, expected[1].front])
    })
  })

  describe('gotWrong, gotRight, and counts', () => {
    it('can find the right/wrong counts and nullify times', () => {
      let newExpected = gotWrong(expected, 0)
      expected[0].history.push({
        recalled: false,
        time: new Date()
      })
      expect(nullifyTimes(newExpected)).toEqual(nullifyTimes(expected))
      expect(rightWrong(newExpected[0])).toEqual({right: 5, wrong: 2})
      expect(rightWrong(newExpected, 0)).toEqual({right: 5, wrong: 2})
    })
    it('can find the right/wrong counts and nullify times', () => {
      let newExpected = gotRight(expected, 1)
      expected[1].history.push({
        recalled: true,
        time: new Date()
      })
      expect(nullifyTimes(newExpected)).toEqual(nullifyTimes(expected))
      expect(rightWrong(newExpected[1])).toEqual({right: 8, wrong: 2})
      expect(rightWrong(newExpected, 1)).toEqual({right: 8, wrong: 2})

      expect(rightWrong(newExpected)).toEqual({right: 22, wrong: 9})
    })
  })
})
