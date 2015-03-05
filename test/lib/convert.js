var test = require('tape')
var convert = require('../../lib/convert')

test('convert', function (t) {
	var cards = [
		{
			front: 'ostensible',
			back: 'stated or appearing to be true, but not necessarily so.',
			right: 0,
			wrong: 0
		},
		{
			front: 'palpable',
			back: 'able to be touched or felt.',
			right: 0,
			wrong: 0
		},
		{
			front: 'diaphanous',
			back: '(especially of fabric) light, delicate, and translucent.',
			right: 0,
			wrong: 0
		}
	]

	t.deepEqual(convert({
		'ostensible': 'stated or appearing to be true, but not necessarily so.',
		'palpable': 'able to be touched or felt.',
		'diaphanous': '(especially of fabric) light, delicate, and translucent.'
	}, 'objecty'), cards, 'objecty works')

	cards[1].back = 'unspecified'
	cards[2].wrong = 5
	t.deepEqual(convert([
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
			wrong: 5
		}
	], 'nice'), cards, 'nice works')

	cards[2].right = 2
	cards[1].right = 1
	cards[0].front = 'unspecified'
	var importString = '\tstated or appearing to be true, but not necessarily so.\n' +
		'palpable\t\t1\n' +
		'diaphanous\t(especially of fabric) light, delicate, and translucent.\t2\t5'
	t.deepEqual(convert(importString, 'tab/newline'), cards, 'tab/newline works')
	t.deepEqual(convert(importString + '\n', 'tab/newline'), cards, 'tab/newline works even with an extra new line')


	t.throws(function () {
		convert('x')
	}, 'throws if there is no format specified')
	t.throws(function () {
		convert('x', 'not a converter')
	}, 'throws if the format specified does not exist')
	t.equal(convert(undefined, 'tab/newline').length, 0, 'returns an empty array if given undefined as data')

	t.end()
})
