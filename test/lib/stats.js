var test = require('tape')
var gotRight = require('../../lib/stats/got-right.js')
var gotWrong = require('../../lib/stats/got-wrong.js')
var easiest = require('../../lib/stats/easiest.js')
var hardest = require('../../lib/stats/hardest.js')
var sort = require('../../lib/stats/sort.js')
var pick = require('../../lib/stats/pick.js')
var rightWrong = require('../../lib/stats/right-wrong.js')
var convert = require('../../lib/convert')
var makeHistory = require('../make-history.js')
var nullifyTimes = require('../nullify-times.js')

test('stats', function (t) {
  var input = [
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
  var expected = [
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

  t.test('* sort', function (t) {
    var actual = convert(input, 'nice').sort(sort.missesAscending)
    t.deepEqual(nullifyTimes(actual), nullifyTimes(expected), 'should sort based on how many times someone got a card wrong')
    actual = convert(input, 'nice').sort(sort.hitsAscending)
    t.deepEqual(nullifyTimes(actual), nullifyTimes(expected), 'should sort based on how many times someone got a card right')
    actual = convert(input, 'nice').sort(sort.hardnessAscending)
    t.deepEqual(nullifyTimes(actual), nullifyTimes(expected), 'should sort based on "hardness" (wrong/(wrong+right))')
    actual = convert(input, 'nice').sort(sort.timesSeenAscending)
    t.deepEqual(nullifyTimes(actual), nullifyTimes(expected), 'should sort based on times seen')

    input[0].history = makeHistory(0, 0)
    input[1].history = makeHistory(0, 0)
    expected[0].history = makeHistory(0, 0)
    expected[2].history = makeHistory(0, 0)
    actual = convert(input, 'nice').sort(sort.hardnessAscending)
    t.deepEqual(nullifyTimes(actual[2]), nullifyTimes(expected[2]), 'should sort based on "hardness" (wrong/(wrong+right))')
    input[0].history = makeHistory(5, 1)
    input[1].history = makeHistory(9, 6)
    expected[0].history = makeHistory(5, 1)
    expected[2].history = makeHistory(9, 6)

    t.ok(sort.hardnessAscending(input[2], {
      front: 'xyz',
      back: 'something else',
      history: makeHistory(0, 0)
    }) < 0, 'should mark an unseen card as harder')

    t.end()
  })
  t.test('* pick', function (t) {
    t.plan(5)

    // For random and shuffle (they're the same), test whether the returned value exists in the stack
    var actual = pick.random(input)
    t.ok(actual < input.length && actual >= 0, 'random should pick in bounds')
    actual = pick.shuffle(input)
    t.ok(actual < input.length && actual >= 0, 'random should still pick in bounds')

    actual = pick.even(input)
    t.equal(actual, 0, 'even should lead to even distribution')
    actual = pick.easy(input)
    t.equal(actual, 0, 'easy should pick the easiest card')
    actual = pick.hard(input)
    t.equal(actual, 1, 'hard should pick the hardest card')
  })
  t.test('* hardest', function (t) {
    t.deepEqual(nullifyTimes(hardest(input)), nullifyTimes(expected[2]), 'should work even without being given all of the arguments it accepts')
    t.deepEqual(nullifyTimes(hardest(input, 1)), nullifyTimes(expected[2]), 'should not return an array if count = 1')
    t.deepEqual(nullifyTimes(hardest(input, 2)), nullifyTimes([expected[2], expected[1]]), 'should pay attention to the count argument')
    t.deepEqual(hardest(input, 'front'), expected[2].front, 'should allow the key argument to take the place of the count argument')
    t.deepEqual(hardest(input, 2, 'front'), [expected[2].front, expected[1].front], 'should allow both the key and the count to be set')
    t.end()
  })
  t.test('* easiest', function (t) {
    t.deepEqual(nullifyTimes(easiest(input)), nullifyTimes(expected[0]), 'should work even without being given all of the arguments it accepts')
    t.deepEqual(nullifyTimes(easiest(input, 1)), nullifyTimes(expected[0]), 'should not return an array if count = 1')
    t.deepEqual(nullifyTimes(easiest(input, 2)), nullifyTimes([expected[0], expected[1]]), 'should pay attention to the count argument')
    t.deepEqual(easiest(input, 'front'), expected[0].front, 'should allow the key argument to take the place of the count argument')
    t.deepEqual(easiest(input, 2, 'front'), [expected[0].front, expected[1].front], 'should allow both the key and the count to be set')
    t.end()
  })

  t.test('* gotWrong, gotRight, and counts', function (t) {
    var newExpected = gotWrong(expected, 0)
    expected[0].history.push({
      recalled: false,
      time: new Date()
    })
    t.deepEqual(nullifyTimes(newExpected), nullifyTimes(expected), 'it was marked wrong')
    t.deepEqual(rightWrong(newExpected[0]), {right: 5, wrong: 2}, 'rightWrong has the correct results')
    t.deepEqual(rightWrong(newExpected, 0), {right: 5, wrong: 2}, 'rightWrong has the correct results (when given a key separately)')

    newExpected = gotRight(expected, 1)
    expected[1].history.push({
      recalled: true,
      time: new Date()
    })
    t.deepEqual(nullifyTimes(newExpected), nullifyTimes(expected), 'it was marked right')
    t.deepEqual(rightWrong(newExpected[1]), {right: 8, wrong: 2}, 'rightWrong has the correct results')
    t.deepEqual(rightWrong(newExpected, 1), {right: 8, wrong: 2}, 'rightWrong has the correct results (when given a key separately)')

    t.deepEqual(rightWrong(newExpected), {right: 22, wrong: 10}, 'rightWrong works if it is passed an entire stack')

    t.end()
  })
})
