global.reallyIsTTY = !!process.stdout.isTTY
process.stdout.isTTY = false

const f = require('../lib/module.js')
const quiz = f.quiz
const quizzer = require('../cli-quizzer.js')
const picker = f.pick.random
const mockIO = require('./mock-stdin-stdout.js')
const makeHistory = require('./make-history.js')
const nullifyTimes = require('./nullify-times.js')

const input = [
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

describe('quiz', () => {
  it('works in a vacuum', () => {
    expect.assertions(1)

    // Without a picker function, quiz should be like calling the quizzer function directly on the data
    const output = quiz('hello world', x => x)
    expect(output).toBe('hello world')
  })

  describe('use with cli-quizzer.js', () => {
    it('knows what to do when you get a question right', () => {
      expect.assertions(1)
      mockIO.start()
      const outputPromise = quiz(input, quizzer, picker)
      // Read the prompt that is supposed to be given to the user
      const prompt = mockIO.read()[1]
      // Remove the '? ' at the beginning of the prompt and the '\n  ' at the end of it to get the front of the card
      const front = prompt.slice(2, -3)
      // Find the ID of the card with that^ front
      let id = false
      for (let i = 0; i < input.length; i += 1) {
        if (input[i].front === front) {
          id = i
        }
      }
      // Send the right answer
      mockIO.write(input[id].back + '\n')
      mockIO.stop()
      return outputPromise.then(quizOutput => {
        const copyOfInputs = f.convert(input, 'nice')
        copyOfInputs[id].history = makeHistory(1, 0)
        expect(nullifyTimes(quizOutput)).toEqual(nullifyTimes(copyOfInputs))
      })
    })
    it('knows what to do when you get a question wrong', () => {
      expect.assertions(1)
      mockIO.start()
      const outputPromise = quiz(input, quizzer, picker)
      // Read the prompt that is supposed to be given to the user
      const prompt = mockIO.read()[1]
      // Remove the '? ' at the beginning of the prompt and the '\n  ' at the end of it to get the front of the card
      const front = prompt.slice(2, -3)
      // Find the ID of the card with that^ front
      let id = false
      for (let i = 0; i < input.length; i += 1) {
        if (input[i].front === front) {
          id = i
        }
      }
      // Send the wrong answer
      mockIO.write('Wrong answer\n')
      mockIO.stop()
      return outputPromise.then(quizOutput => {
        const copyOfInputs = f.convert(input, 'nice')
        copyOfInputs[id].history = makeHistory(0, 1)
        expect(nullifyTimes(copyOfInputs)).toEqual(nullifyTimes(quizOutput))
      })
    })
  })
})
