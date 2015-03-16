var test = require('tape')

// Pretend that we're in a terminal without colors
global.reallyIsTTY = !!process.stdout.isTTY
process.stdout.isTTY = false

var f = require('../../lib/module.js')
var copy = f.copy
var quiz = f.quiz
var quizzer = f.cliQuizzer
var picker = f.pick.random
var mockIO = require('./mock-stdin-stdout.js')

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

test('quiz', function (t) {
        t.test('* simple abilities', function (t) {
		t.plan(1)

		// Without a picker function, quiz should be like calling the quizzer function directly on the data
		var output = quiz('hello world', function (x) {
			return x
		})
		t.equal(output, 'hello world')
	})

	t.test('* correct answer', function (t) {
		t.plan(1)
		mockIO.start()
		var outputPromise = quiz(input, quizzer, picker)
		// Read the prompt that is supposed to be given to the user
		var prompt = mockIO.read()[0]
		// Remove the '? ' at the beginning of the prompt and the ' ' at the end of it to get the front of the card
		var front = prompt.slice(2, -2)
		// Find the ID of the card with that^ front
		var id = false
		for (var i = 0; i < input.length; i += 1) {
			if (input[i].front === front) {
				id = i
			}
		}
		// Send the right answer
		mockIO.write(input[id].back + '\n')
		mockIO.stop()
		outputPromise.then(function (quizOutput) {
			var copyOfInputs = copy(input)
			copyOfInputs[id].right += 1
			t.deepEqual(quizOutput, copyOfInputs, 'the quiz should mark some things right')
		})
	})

	t.test('* incorrect answer', function (t) {
		t.plan(1)
		mockIO.start()
		var outputPromise = quiz(input, quizzer, picker)
		// Read the prompt that is supposed to be given to the user
		var prompt = mockIO.read()[0]
		// Remove the '? ' at the beginning of the prompt and the ' ' at the end of it to get the front of the card
		var front = prompt.slice(2, -2)
		// Find the ID of the card with that^ front
		var id = false
		for (var i = 0; i < input.length; i += 1) {
			if (input[i].front === front) {
				id = i
			}
		}
		// Send the wrong answer
		mockIO.write('Wrong answer\n')
		mockIO.stop()
		outputPromise.then(function (quizOutput) {
			var copyOfInputs = copy(input)
			copyOfInputs[id].wrong += 1
			t.deepEqual(copyOfInputs, quizOutput, 'the quiz should mark some things wrong')
		})
	})
})
