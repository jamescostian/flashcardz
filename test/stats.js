var assert = require('assert')
var sort = require('../lib/stats/sort.js')

describe('stats', function () {
	describe('sort', function () {
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
})
