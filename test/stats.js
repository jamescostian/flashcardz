var assert = require('assert')
var easiest = require('../lib/stats/easiest.js')
var hardest = require('../lib/stats/hardest.js')
var sort = require('../lib/stats/sort.js')

describe('stats', function () {
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

	describe('sort', function () {
		it('should be able to sort based on how many times someone got a card wrong', function () {
			var actual = input.sort(sort.missesAscending)
			assert.deepEqual(actual, expected)
		})
		it('should be able to sort based on how many times someone got a card right', function () {
			var actual = input.sort(sort.hitsAscending)
			assert.deepEqual(actual, expected)
		})
		it('should be able to sort based on "hardness" (wrong/(wrong+right))', function () {
			var actual = input.sort(sort.hardnessAscending)
			assert.deepEqual(actual, expected)
		})
	})
	describe('hardest', function () {
		it('should work, even without being given all of the arguments it accepts', function () {
			assert.deepEqual(hardest(input), expected[2])
		})
		it('should not return an array if count = 1', function () {
			assert.deepEqual(hardest(input, 1), expected[2])
		})
		it('should pay attention to the count argument', function () {
			assert.deepEqual(hardest(input, 2), [expected[2], expected[1]])
		})
		it('should allow the key argument to take the place of the count argument', function () {
			assert.deepEqual(hardest(input, 'front'), expected[2].front)
		})
		it('should allow both the key and the count to be set', function () {
			assert.deepEqual(hardest(input, 2, 'front'), [expected[2].front, expected[1].front])
		})
	})
	describe('easiest', function () {
		it('should work, even without being given all of the arguments it accepts', function () {
			assert.deepEqual(easiest(input), expected[0])
		})
		it('should not return an array if count = 1', function () {
			assert.deepEqual(easiest(input, 1), expected[0])
		})
		it('should pay attention to the count argument', function () {
			assert.deepEqual(easiest(input, 2), [expected[0], expected[1]])
		})
		it('should allow the key argument to take the place of the count argument', function () {
			assert.deepEqual(easiest(input, 'front'), expected[0].front)
		})
		it('should allow both the key and the count to be set', function () {
			assert.deepEqual(easiest(input, 2, 'front'), [expected[0].front, expected[1].front])
		})
	})
})
