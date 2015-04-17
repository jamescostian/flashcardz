# Introduction

This document assumes that you're providing flashcards in a specific format. Flashcardz expects all of the flashcards to be in an array, and it expects that all of the flashcards are objects. Each flashcard object is expected to have a `front` and `back`, as well as `right` and `wrong` (`right` is the number of times the person has gotten that card right, and `wrong` is the number of times the person has gotten that card wrong). Here's an example data set:

```js
var cards = [
	{
		front: 'ostensible',
		back: 'stated or appearing to be true, but not necessarily so.',
		right: 3,
		wrong: 5
	},
	{
		front: 'palpable',
		back: 'able to be touched or felt.',
		right: 0,
		wrong: 6
	}
]
```

It's also worth noting every method here is idempotent, and none of them will mutate your arrays. For example, if you use `f.gotWrong(cards, 4)`, the card at the index of 4 will not be marked wrong in the array `cards` - instead, a new array will be returned containing all of the old array's cards, and in that new array the card at index 4 will be marked wrong. This allows for functional-style programming.

Another note: `f.quiz` is the only method with "side-effects"

## Walk-Through

This API is kinda meant to be a walk-through like in a video game. Get ready to try out some code! First do this:

```bash
npm install flashcardz
node
```

And then type in:

```js
var f = require('flashcardz')
```

Finally, copy and paste the example data set near the top of this documentation.

Feel free to ignore the explanations and just copy and paste the code examples and play around. What follows is the actual documentation.

# `f.gotWrong(stack, id)`

This will return a new array with the number of times a card was gotten wrong incremented. For example:

```js
cards[0].wrong = 5
cards = f.gotWrong(cards, 0)
// cards[0].wrong = 6
```

# `f.gotRight(stack, id)`

This will return a new array with the number of times a card was gotten right incremented. For example:

```js
cards[1].right = 10
cards = f.gotRight(cards, 1)
// cards[1].right = 11
```

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

This is almost the same as `f.idsByFront(stack, front)[0]` except faster, and if the `front` is not found then this will return -1.

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

Just like `f.hardest()` except this one returns the easiest card (or cards if you provide a `count` > 1, or parts of cards if you provide a `key`).

# `f.convert(data, type)`

Given some sort of `data` (which is not in the flashcardz format) and the type of data (`type`), this will the data in the Flashcardz format. Currently, there are only 3 types accepted. One is 'tab/newline', in which the front and back of each card is separated by a tab and each card is separated by a newline. Here's an example:

```js
var exampleTabNewline = 'front of card' + '\t' + 'back of card'
	+ '\n' + front of a different card' + '\t' + 'back of this card'
	+ '\n' + this card has been' + '\t' + 'gotten wrong 4 times and right 2 times' + '\t' + '4' + '\t' + '2'

f.convert(exampleTabNewline, 'tab/newline') // returns something like:
// [{front: 'front of card', back: 'back of card', right: 0, wrong: 0}, ...]
```

You can also provide `f.convert` with streams as data instead of strings. In addition, you can also convert "objecty" flashcards:

```js
f.convert({
	ostensible: 'stated or appearing to be true, but not necessarily so.',
	palpable: 'able to be touched or felt.'
}, 'objecty') // puts those^ flashcards into the Flashcardz format
```

`f.convert` can also be used to normalize flashcards by giving them values they should have. For example:

```js
f.convert(var cards = [
	{
		front: 'ostensible',
		wrong: 5
	},
	{
		front: 'palpable',
		back: 'able to be touched or felt.'
	}
], 'nice')
// Returns:
// [
//     {
//         front: 'ostensible',
//         back: 'unspecified',
//         right: 0,
//         wrong: 5
//     },
//     {
//         front: 'palpable',
//         back: 'able to be touched or felt.',
//         right: 0,
//         wrong: 0
//     }
// ]
```

# `f.quiz(...)`

`f.quiz()` returns a promise for the new state after the quiz, it's really up to you to decide how to implement a lot of its details. You can provide a `quizzer` function - an asynchronous function that actually quizzes the user on 1 card and promises to return that card's new state (which may have it's `wrong` or `right` key increased, or even have a new, custom key). You can also provide a function that picks which card the user will be quizzed over - `picker` - and synchronously returns the ID of the card picked in the stack.

Here are all of the different signatures that `f.quiz` supports:

`f.quiz(card, quizzer)` returns `quizzer(card)`. Basically, `f.quiz(card, quizzer)` is for getting quizzed over 1 card.

`f.quiz(stack, quizzer, picker)` puts `stack` through `picker` (i.e. `picker(stack)`), which should pick one card to be quizzed over, and then that card should be put through `quizzer`. Once `quizzer`'s promise is resolved, the card should be updated to whatever `quizzer`'s promise resolved to. In other words, `f.quiz(stack, quizzer, picker)` returns a promise for the new state of the stack after the user has been quizzed over one card.

Flashcardz comes with a quizzer: `f.cliQuizzer`. This quizzer will quiz the user from their terminal. Here are some examples of how to use it:

```js
f.quiz(cards[0], f.cliQuizzer) // get quizzed over the first card
f.quiz(cards[0], f.cliQuizzer({show: 'back', answer: 'front'})) // see the back of the card, guess the front
```

Flashcardz also comes with 4 pickers:

+ `improve` - the default, which is like a combination of hard, even, and random
+ `hard` - show the hardest cards first
+ `easy` - show the easiest cards first
+ `even` - try to make every card shown the same number of times
+ `random` or `shuffle` - show the cards in a random order

Here's an example of how to get quizzed over a random card:

```js
f.quiz(cards, f.cliQuizzer, f.pick.random)
```

# `f.copy(array)`

A very general function for copying arrays. It works for copying stacks of flashcards, and is used internally, but it's still a very general function.
