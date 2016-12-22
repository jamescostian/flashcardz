# Format

This document assumes that you're providing flashcards in a specific format. Flashcardz expects all of the flashcards to be in an array, and it expects that all of the flashcards are objects. Each flashcard object is expected to have a `front` and `back`, as well as `history`. `history` is an array of objects, where each object represents a time when a user responded to a quiz. Each of those event objects is a regular object with at least a `time` (which points to a `Date` object that says when the user responded to the quiz) and a `recalled` key (which is either true or false, where true means that they got it right). Here's an example of a stack of cards in this format:

```js
const cards = [
  {
    front: 'ostensible',
    back: 'stated or appearing to be true, but not necessarily so.',
    history: [
      {
        time: new Date(),
        recalled: true
      }
    ]
  },
  {
    front: 'palpable',
    back: 'able to be touched or felt.',
    history: [
      {
        time: new Date(),
        recalled: false
      }
    ]
  }
]
```

Based on the above example, one can gather that there are only 2 cards in that stack

It's also worth noting every function here is idempotent, and none of them will mutate your arrays. For example, if you use `f.gotWrong(cards, 4)`, the card at the index of 4 will not be marked wrong in the array `cards` - instead, a new array will be returned containing all of the old array's cards, and in that new array the card at index 4 will be marked wrong. This allows for functional-style programming.

Another note: `f.quiz` is the only function with "side-effects"

## Walk-Through

This API is kinda meant to be a walk-through like in a video game. Get ready to try out some code! First do this:

```bash
npm install flashcardz
node
```

And then type in:

```js
const f = require('flashcardz')
```

Finally, copy and paste the example data set near the top of this documentation.

Feel free to ignore the explanations and just copy and paste the code examples and play around. Except for the code that starts with `f.quiz()` - once you get to that section, don't copy and paste that code into your REPL because it will take over the terminal

# `f.addHistoryEvent(stack, id, recalled, time)`

This is used to add an event to history. You provide a `stack`, an `id` in the stack, whether the card was correctly `recalled`, and optionally a `time` (when the event happened). If you just want to use one card instead of a stack, that works too. For example, the below code will add an event where card was correctly recalled:

```js
f.addHistoryEvent(cards[1], true, new Date())
```

This function does not change the original stack or card you passed to it, it instead returns a new stack or card with the new event.

# `f.gotWrong(stack, id)`

Essentially the same as `f.addHistoryEvent()` except it assumes that `recalled` is false and that the `time` is `Date.now()`. For example:

```js
cards = f.gotWrong(cards, 0)
cards[0].history // contains another event where the card was gotten wrong (recalled: false)
```

# `f.gotRight(stack, id)`

Essentially the same as `f.addHistoryEvent()` except it assumes that `recalled` is true and that the `time` is `Date.now()`. For example:

```js
cards = f.gotRight(cards, 1)
cards[1].history // contains another event where the card was gotten right (recalled: true)
```

# `f.rightWrong(card)`

Given a card, counts how many times the card was recalled and how many times it wasn't recalled correctly.

```js
f.rightWrong(cards[0]) // { right: 1, wrong: 1 }
cards = f.gotRight(cards, 0)
f.rightWrong(cards[0]) // { right: 2, wrong: 1 }
```

If you pass this function a stack of cards, it will return how many times any of the cards have been recalled correctly and how many times any of them have been not been recalled correctly. For example:

```js
f.rightWrong(cards) // {right: 3, wrong: 2}
```

Or, you can pass in a stack and an id like `f.rightWrong(cards, 0)`, and it'll be treated the same as `f.rightWrong(cards[0])`

# `f.idsByFront(stack, front)`

This will make a list of IDs of every card with a specific front in a stack. Here's an example:

```js
f.idsByFront(cards, 'ostensible') // [0]
```

If the `front` is not found, an empty array is returned.

# `f.idByFront(stack, front)`

This will find the ID of the first card with a specific front in a stack. Here's an example:

```js
f.idByFront(cards, 'ostensible') // 0
```

This is almost the same as `f.idsByFront(stack, front)[0]` except faster, and if the `front` is not found then this will return -1. It is also known as `f.indexOf(stack, front)`

Here's an example of how you may actuall use `f.idByFront()` or `f.indexOf()`:

```js
// Say that "ostensible" was correctly recalled:
cards = f.gotRight(cards, f.indexOf(cards, 'ostensible'))
```

# `f.hardest(stack, count, key)`

Given a stack, returns the hardest term. Hardness is calculated by the number of times the user got the card wrong divided by the number of times they got it right plus the number of times they got it wrong. This returns the card. For example:

```js
f.hardest(cards) // the #1 hardest card
// e.g. {front: 'palpable', ...}
```

You can also ask for the 2 hardest, or the 3 hardest, or even the *n* hardest if you just use the count variable. For example:

```js
f.hardest(cards, 2) // the 2 hardest cards, in an array
// e.g. [{front: 'palpable', ...}, {front: 'ostensible', ...}]
```

You can also ask for a particular key of the hardest card. For example:

```js
f.hardest(cards, 'front') // the front of the #1 hardest card
// e.g. 'palpable'
```

In fact, you can combine the two features above:

```js
f.hardest(cards, 2, 'front') // the fronts of the 2 hardest cards
// e.g. ['palpable', 'ostensible']
```

# `f.easiest(stack, count, key)`

Just like `f.hardest()` except this one is for the easiest card(s).

# `f.convert(data, type)`

Given some sort of `data` (which is not in the flashcardz format) and the type of data (`type`), this will the data in the Flashcardz format. Currently, there are only 4 types accepted. One is 'tab/newline', in which the front and back of each card is separated by a tab and each card is separated by a newline. Here's an example:

```js
const exampleTabNewline = 'front of card' + '\t' + 'back of card' +
  '\n' + 'front of a different card' + '\t' + 'back of this card' +
  '\n' + '' + '\t' + 'the front of this card will be "unspecified"'

f.convert(exampleTabNewline, 'tab/newline') // returns something like:
// [{front: 'front of card', back: 'back of card', history: []}, ...]
```

You can also provide `f.convert` with streams as data instead of strings. In addition, you can also convert "objecty" flashcards:

```js
f.convert({
  ostensible: 'stated or appearing to be true, but not necessarily so.',
  palpable: 'able to be touched or felt.'
}, 'objecty') // puts those^ flashcards into the Flashcardz format
```

`f.convert` can also be used to normalize flashcards by giving them values they should have - just use the type "nice". For example:

```js
f.convert([
  {
    front: 'ostensible',
    history: [{time: new Date(), recalled: true}]
  },
  {
    front: 'palpable',
    back: 'able to be touched or felt.'
  }
], 'nice')
// Returns:
// [
//   {
//     front: 'ostensible',
//     back: 'unspecified',
//     history: [{time: new Date(), recalled: true}]
//   },
//   {
//     front: 'palpable',
//     back: 'able to be touched or felt.',
//     history: []
//   }
// ]
```

In addition, there's a "single" type, which is just like the "nice" type, except "single" is for normalizing a single card.

If you do not specify a type, either "nice" or "single" will be assumed based on whether `data` is an array or not (if `data` is an array, it is assumed to be a stack and "nice" is used - otherwise it's assumed to be a card and "single" is used).

# `f.quiz(...)`

`f.quiz()` returns a promise for the new state after the quiz, it's really up to you to decide how to implement a lot of its details. You can provide a `quizzer` function - an asynchronous function that actually quizzes the user on 1 card and promises to return that card's new state (which may have it's `history` changed, or even have new, custom keys). You can also provide a function that picks which card the user will be quizzed over - `picker` - and (synchronously) returns the ID of the card picked in the stack.

Here are all of the different signatures that `f.quiz` supports:

`f.quiz(card, quizzer)` returns `quizzer(card)`. Basically, `f.quiz(card, quizzer)` is for getting quizzed over 1 card.

`f.quiz(stack, quizzer, picker)` puts `stack` through `picker` (i.e. `picker(stack)`), which should pick one card to be quizzed over, and then that card is put through `quizzer`. Once `quizzer`'s promise is resolved, the card should be updated to whatever `quizzer`'s promise resolved to. In other words, `f.quiz(stack, quizzer, picker)` returns a promise for the new state of the stack after the user has been quizzed over one card.

Flashcardz comes with a quizzer which you can access with `require('flashcardz/cli-quizzer')`. This quizzer will quiz the user from their terminal. Here are some examples of how to use it:

```js
f.quiz(cards[0], require('flashcardz/cli-quizzer')) // get quizzed over the first card
```

```js
f.quiz(cards[0], require('flashcardz/cli-quizzer')({show: 'back', answer: 'front'})) // see the back of the card, guess the front
```

Flashcardz also comes with 5 pickers:

+ `smart` - the default, and the best (more details in a later section)
+ `hard` - show the hardest cards first
+ `easy` - show the easiest cards first
+ `even` - try to make every card shown the same number of times
+ `random` or `shuffle` - show the cards in a random order

Here's an example of how to get quizzed over a random card:

```js
f.quiz(cards, require('flashcardz/cli-quizzer'), f.pick.random)
```

# `f.pick.smart(options)`

Given an object with options, returns a smart picker function for use with `f.quiz()`. The only option currently supported is acceptance, which defaults to 2. The value of acceptance is the number of times the person is supposed to correctly recall a card sequentially. So, if the acceptance is at 2, the picker will be biased to choose cards that not even been seen two times or that were not correctly recalled according to their 2 most recent events in their `history`. In addition, assuming that the acceptance is 2, cards that were recalled correctly according to one or two of their most recent event in their `history` will be avoided - the picker will specifically try to avoid showing you them, because you've already gotten them right twice.

Here's an example of how to use it:

```js
// The picker will try to get you to get a card right 9 times in a row
f.quiz(cards, require('flashcardz/cli-quizzer'), f.pick.smart({acceptance: 9}))
```

# `f.copy(array)`

A very general function for copying arrays. But be warned, it will mess up `Date` objects like the ones in the `history` of each card. So if you want to copy a stack or a card, use `f.convert()` instead!
