var test = require('tape')
var convert = require('../../lib/convert')
var makeHistory = require('../make-history.js')
var nullifyTimes = require('../nullify-times.js')

test('convert', function (t) {
	var cards = [
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

	t.deepEqual(convert({
		'ostensible': 'stated or appearing to be true, but not necessarily so.',
		'palpable': 'able to be touched or felt.',
		'diaphanous': '(especially of fabric) light, delicate, and translucent.'
	}, 'objecty'), cards, 'objecty works')

	cards[1].back = 'unspecified'
	cards[2].history = makeHistory(0, 5)
	t.deepEqual(nullifyTimes(convert([
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
	], 'nice')), nullifyTimes(cards), 'nice works')

	cards[2].history = []
	cards[0].front = 'unspecified'
	var importString = '\tstated or appearing to be true, but not necessarily so.\n' +
		'palpable\t\n' +
		'diaphanous\t(especially of fabric) light, delicate, and translucent.'
	t.deepEqual(nullifyTimes(convert(importString, 'tab/newline')), nullifyTimes(cards), 'tab/newline works')
	t.deepEqual(nullifyTimes(convert(importString + '\n', 'tab/newline')), nullifyTimes(cards), 'tab/newline works even with an extra new line')


	t.throws(function () {
		convert('x', 'not a converter')
	}, 'throws if the format specified does not exist')
	t.equal(convert(undefined, 'tab/newline').length, 0, 'returns an empty array if given undefined as data')

	t.equal(convert([{}])[0].front, 'unspecified', 'should be able to use nice as a default')

	t.equal(convert({}).front, 'unspecified', 'should be able to use single as a default')

	t.equal(convert({
		front: 'IDK',
		back: ':)',
		history: [
			{
				time: 50000,
				recalled: false,
			}
		]
	}, 'single').history[0].time.getTime(), 50000, 'should be able to parse integer times')

	var d = new Date()
	t.equal(convert({
		front: 'IDK',
		back: ':)',
		history: [
			{
				time: d,
				recalled: false,
			}
		]
	}, 'single').history[0].time.toString(), d.toString(), 'should be able to parse Date times')

	t.end()
})
