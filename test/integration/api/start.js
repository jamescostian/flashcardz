var test = require('tape')
var thePath = __dirname + '/.deleteme-api'
require('rimraf').sync(thePath)
var flashcardz = require('../../../lib/module.js')({path: thePath})

test('API integration', function (t) {
	var expectedModel = [
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

	flashcardz.insert('myStackOfFlashcards', {
		ostensible: 'stated or appearing to be true, but not necessarily so.',
		palpable: 'able to be touched or felt.',
		diaphanous: '(especially of fabric) light, delicate, and translucent.'
	})
	t.deepEqual(flashcardz.get('myStackOfFlashcards'), expectedModel)

	flashcardz.insertCard('myStackOfFlashcards', {x: 'y'})
	expectedModel.push({
			front: 'x',
			back: 'y',
			right: 0,
			wrong: 0
	})
	t.deepEqual(flashcardz.get('myStackOfFlashcards'), expectedModel)

	flashcardz.setCard('myStackOfFlashcards', 'x', {back: 'g'})
	expectedModel[3].back = 'g'
	t.deepEqual(flashcardz.get('myStackOfFlashcards'), expectedModel)

	flashcardz.setCard('myStackOfFlashcards', 3, {front: 'h'})
	expectedModel[3].front = 'h'
	t.deepEqual(flashcardz.get('myStackOfFlashcards'), expectedModel)

	t.equal(flashcardz.idByFront('myStackOfFlashcards', 'x'), -1)
	t.deepEqual(flashcardz.idsByFront('myStackOfFlashcards', 'x'), [])
	t.deepEqual(flashcardz.idsByFront('myStackOfFlashcards', 'h'), [3])

	t.throws(function () {
		flashcardz.insert('myStackOfFlashcards', {})
	}, 'should not be possible to insert 2 stacks with the same name')

	// Don't save; just refersh to emptiness
	flashcardz.refresh()
	// Since myStackOfFlashcards wasn't saved, one should be able to make a new stack with the same name
	flashcardz.insert('myStackOfFlashcards', expectedModel)
	t.deepEqual(flashcardz.get('myStackOfFlashcards'), expectedModel)

	flashcardz.save()
	require('rimraf').sync(thePath)
	flashcardz.save()
	flashcardz.save()

	t.deepEqual(flashcardz.loadStacks().myStackOfFlashcards, expectedModel)
	t.deepEqual(flashcardz.loadStacks(true).myStackOfFlashcards, expectedModel)

	t.throws(function () {
		flashcardz.loadStack('yo')
	}, 'should not be possible to load a stack that doesn\'t exist')

	var myCopyOfStacks = (function(x){return x}(flashcardz.stacks))
	t.deepEqual(flashcardz.loadStacks(), myCopyOfStacks)

	t.doesNotThrow(function () {
		flashcardz.save('myStackOfFlashcards')
	})

	flashcardz.gotRight('myStackOfFlashcards', 'palpable')
	flashcardz.gotRight('myStackOfFlashcards', 'palpable')
	flashcardz.gotRight('myStackOfFlashcards', 'palpable')

	flashcardz.gotRight('myStackOfFlashcards', 'ostensible')
	flashcardz.gotRight('myStackOfFlashcards', 'ostensible')
	flashcardz.gotWrong('myStackOfFlashcards', 'ostensible')

	flashcardz.gotRight('myStackOfFlashcards', 'diaphanous')
	flashcardz.gotWrong('myStackOfFlashcards', 'diaphanous')
	flashcardz.gotWrong('myStackOfFlashcards', 'diaphanous')

	flashcardz.gotRight('myStackOfFlashcards', 3)
	flashcardz.gotRight('myStackOfFlashcards', 3)
	flashcardz.gotWrong('myStackOfFlashcards', 3)

	t.equal(flashcardz.easiest('myStackOfFlashcards', 'front'), 'palpable')
	t.equal(flashcardz.hardest('myStackOfFlashcards', 'front'), 'diaphanous')
	t.equal(flashcardz.easiest('myStackOfFlashcards', 'front'), 'palpable')
	t.equal(flashcardz.hardest('myStackOfFlashcards', 'front'), 'diaphanous')

	t.deepEqual(flashcardz.import(__dirname + '/import-me', 'tab/newline'), [
		{
			back: 'y',
			front: 'x',
			right: 0,
			wrong: 0
		},
		{
			back: 'def',
			front: 'abc',
			right: 4,
			wrong: 1
		},
		{
			back: 'jkl',
			front: 'ghi',
			right: 0,
			wrong: 0
		}
	])

	t.throws(function () {
		flashcardz.import(__dirname + '/import-me')
	})


	require('rimraf').sync(thePath)
	t.end()
})
