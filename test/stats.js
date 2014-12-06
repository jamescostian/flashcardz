var test = require('tape')
var easiest = require('../lib/stats/easiest.js')
var hardest = require('../lib/stats/hardest.js')
var sort = require('../lib/stats/sort.js')

test('stats', function (t) {
	var input = [
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
	// expected is the expected output for ALL OF THE SORTING ALGORITHMS.
	// The input was specifically picked so that only 1 expected output would be required.
	var expected = [
		{// hardness = 1/6
			front: 'ostensible',
			back: 'stated or appearing to be true, but not necessarily so.',
			right: 5,
			wrong: 1
		},
		{// hardness = 2/9
			front: 'diaphanous',
			back: '(especially of fabric) light, delicate, and translucent.',
			right: 7,
			wrong: 2
		},
		{// hardness = 6/15
			front: 'palpable',
			back: 'able to be touched or felt.',
			right: 9,
			wrong: 6
		}
	]

	t.test('* sort', function (t) {
		var actual = input.sort(sort.missesAscending)
		t.deepEqual(actual, expected, 'should sort based on how many times someone got a card wrong')
		actual = input.sort(sort.hitsAscending)
		t.deepEqual(actual, expected, 'should sort based on how many times someone got a card right')
		actual = input.sort(sort.hardnessAscending)
		t.deepEqual(actual, expected, 'should sort based on "hardness" (wrong/(wrong+right))')
		t.end()
	})
	t.test('* hardest', function (t) {
		t.deepEqual(hardest(input), expected[2], 'should work even without being given all of the arguments it accepts')
		t.deepEqual(hardest(input, 1), expected[2], 'should not return an array if count = 1')
		t.deepEqual(hardest(input, 2), [expected[2], expected[1]], 'should pay attention to the count argument')
		t.deepEqual(hardest(input, 'front'), expected[2].front, 'should allow the key argument to take the place of the count argument')
		t.deepEqual(hardest(input, 2, 'front'), [expected[2].front, expected[1].front], 'should allow both the key and the count to be set')
		t.end()
	})
	t.test('* easiest', function (t) {
		t.deepEqual(easiest(input), expected[0], 'should work even without being given all of the arguments it accepts')
		t.deepEqual(easiest(input, 1), expected[0], 'should not return an array if count = 1')
		t.deepEqual(easiest(input, 2), [expected[0], expected[1]], 'should pay attention to the count argument')
		t.deepEqual(easiest(input, 'front'), expected[0].front, 'should allow the key argument to take the place of the count argument')
		t.deepEqual(easiest(input, 2, 'front'), [expected[0].front, expected[1].front], 'should allow both the key and the count to be set')
		t.end()
	})
})
