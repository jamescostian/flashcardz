var test = require('tape')

// Pretend that we're in a terminal without colors
global.reallyIsTTY = !!process.stdout.isTTY
process.stdout.isTTY = false

var f = require('../../lib/module.js')
var quiz = f.quiz
var quizzer = require('../../cli-quizzer.js')
var picker = f.pick.random
var mockIO = require('./mock-stdin-stdout.js')
var makeHistory = require('../make-history.js')
var nullifyTimes = require('../nullify-times.js')

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
    var prompt = mockIO.read()[1]
    // Remove the '? ' at the beginning of the prompt and the '\n  ' at the end of it to get the front of the card
    var front = prompt.slice(2, -3)
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
      var copyOfInputs = f.convert(input, 'nice')
      copyOfInputs[id].history = makeHistory(1, 0)
      t.deepEqual(nullifyTimes(quizOutput), nullifyTimes(copyOfInputs), 'the quiz should mark some things right')
    })
  })

  t.test('* incorrect answer', function (t) {
    t.plan(1)
    mockIO.start()
    var outputPromise = quiz(input, quizzer, picker)
    // Read the prompt that is supposed to be given to the user
    var prompt = mockIO.read()[1]
    // Remove the '? ' at the beginning of the prompt and the '\n  ' at the end of it to get the front of the card
    var front = prompt.slice(2, -3)
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
      var copyOfInputs = f.convert(input, 'nice')
      copyOfInputs[id].history = makeHistory(0, 1)
      t.deepEqual(nullifyTimes(copyOfInputs), nullifyTimes(quizOutput), 'the quiz should mark some things wrong')
    })
  })
})
