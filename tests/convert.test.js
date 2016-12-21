const convert = require('../lib/convert')
const makeHistory = require('./make-history.js')
const nullifyTimes = require('./nullify-times.js')

it('convert', () => {
  const cards = [
    {
      front: 'ostensible',
      back: 'stated or appearing to be true, but not necessarily so.',
      history: []
    },
    {
      front: 'palpable',
      back: 'able to be touched or felt.',
      history: []
    },
    {
      front: 'diaphanous',
      back: '(especially of fabric) light, delicate, and translucent.',
      history: []
    }
  ]

  expect(convert({
    'ostensible': 'stated or appearing to be true, but not necessarily so.',
    'palpable': 'able to be touched or felt.',
    'diaphanous': '(especially of fabric) light, delicate, and translucent.'
  }, 'objecty')).toEqual(cards)

  cards[1].back = 'unspecified'
  cards[2].history = makeHistory(0, 5)
  expect(nullifyTimes(convert([
    {
      front: 'ostensible',
      back: 'stated or appearing to be true, but not necessarily so.'
    },
    {
      front: 'palpable'
    },
    {
      front: 'diaphanous',
      back: '(especially of fabric) light, delicate, and translucent.',
      history: [
        {
          recalled: false,
          time: (new Date()).toString()
        },
        {
          recalled: false,
          time: Date.now()
        },
        {
          recalled: false,
          time: Date.now()
        },
        {
          recalled: false,
          time: Date.now()
        },
        {
          recalled: false,
          time: Date.now()
        }
      ]
    }
  ], 'nice'))).toEqual(nullifyTimes(cards))

  cards[2].history = []
  cards[0].front = 'unspecified'
  const importString = '\tstated or appearing to be true, but not necessarily so.\n' +
    'palpable\t\n' +
    'diaphanous\t(especially of fabric) light, delicate, and translucent.'
  expect(nullifyTimes(convert(importString, 'tab/newline'))).toEqual(nullifyTimes(cards))
  expect(nullifyTimes(convert(importString + '\n', 'tab/newline'))).toEqual(nullifyTimes(cards))

  expect(() => convert('x', 'not a converter')).toThrow()
  expect(convert(undefined, 'tab/newline').length).toBe(0)

  expect(convert([{}])[0].front).toBe('unspecified')

  expect(convert({}).front).toBe('unspecified')

  expect(convert({
    front: 'IDK',
    back: ':)',
    history: [
      {
        time: 50000,
        recalled: false
      }
    ]
  }, 'single').history[0].time.getTime()).toBe(50000)

  const d = new Date()
  expect(convert({
    front: 'IDK',
    back: ':)',
    history: [
      {
        time: d,
        recalled: false
      }
    ]
  }, 'single').history[0].time.toString()).toBe(d.toString())
})
