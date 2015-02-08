# Initialization

First of all, you need to initialize Flashcardz. Here's one way to initialize Flashcardz

```js
var flashcardz = require('flashcardz')()
```

The above code will instruct Flashcardz to read/write all of its data in the `~/.flashcardz` directory (which will be created if it does not exist). If you do not want Flashcardz to not touch the filesystem, read the [Note About Files](#note-about-files).

You can also make flashcardz save everything in a different directory:

```js
var flashcardz = require('flashcardz')({path: __dirname + '/special/path'})
```

The rest of this API documentation assumes that you have already initialized Flashcardz with one of the above methods. I'm also going to use `f` for `flashcardz`.

# Walk-Through

This API is kinda meant to be a walk-through like in a video game. Get ready to try out some code! First do this:

```bash
npm install flashcardz
node
```

And then type in:

```js
var f = require('flashcardz')()
```

And then you'll be set!

# Note About Files

Flashcardz can read and write files, and make directories. But, it **will not touch the file system unless you tell it to**. If you intend to use the file system, you ought to run `f.refresh()` immediately after initializing flashcardz. If you intend to avoid the file system, here's a list of things that you should not use:

+ `f.loadStack`
+ `f.loadStacks`
+ `f.getList` - use `Object.keys(f.stacks)` to avoid the filesystem
+ `f.refresh`
+ `f.save`
+ `f.import`

Also, please note that all file system reading/writing is done **synchronously**. I wanted the whole API to be synchronous, because I felt like that made the API simpler.

Each stack of flashcards gets its own file, which starts with the name of the stack and ends with `.flashcardz-stack`

# `f.insertStack(stackName, stack)`

Aliased to `f.insert` for brevity.

Pass it a name for the stack and the stack itself. For example:

```js
f.insert('hi', [
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
])
```

But that code is way too long. So if you're fine with assuming that the user has never gotten the card right or wrong, you can just do something like this:

```js
f.insert('theSameAsHi', {
	ostensible: 'stated or appearing to be true, but not necessarily so.',
	palpable: 'able to be touched or felt.'
})
```

If you try to insert a stack with the same name as another stack, this function will throw an error.

If you use the longer form of expressing a stack, the `right` and `wrong` keys are optional, and they both default to 0.

# `f.insertCard(stackName, card)`

Pass it the name of the stack in which you'd like to insert the card, as well as the card itself. Just like `f.insertStack()`, this function supports 2 different ways of defining cards. The following two examples are equivalent:

```js
f.insertCard('hi', {
	front: 'ostensible',
	back: 'stated or appearing to be true, but not necessarily so.',
	right: 0,
	wrong: 0
})
// is the same as
f.insertCard('hi', {'ostensible': 'stated or appearing to be true, but not necessarily so.'})
```

If you use the longer form of expressing a stack, the `right` and `wrong` keys are optional, and they both default to 0.

# `f.getStack(stackName)`

This is kinda pointless. It's just a short hand for `f.stacks[stack]`. This is also known as `f.get()`

# `f.setCard(stackName, identification, card)`

Allows you to modify a card that already exists in a stack.

This will run `f.setByFront()` or `f.setByID()` based on whether you pass it a number (in which case `f.setByID()` will be run) or a string (in which case `f.setByFront()` will be run).

# `f.setByID(stackName, id, card)`

This will find the card via `f.stacks[stackName][id]` and then update it based on what `card` says. Since cards are stored as objects with 4 keys (front, back, right, and wrong), the card you pass in as an argument will be used as a mask that overwrites certain parts of the object, but leaves other parts alone. Here's an example:

```js
f.setByID('hi', 0, {wrong: 9})
assert.deepEqual(f.get('hi')[0], {
	front: 'ostensible',
	back: 'stated or appearing to be true, but not necessarily so.',
	right: 3,
	wrong: 9
})
```

# `f.setByFront(stackName, front, card)`

This will find the card via `f.idByFront()` and then update it based on what `card` says. It's just like `f.setByID()` except it accepts the front of the card as parameter. Here's an example:

```js
f.setByFront('hi', 'palpable', {back: 'jk'})
assert.deepEqual(f.get('hi')[1], {
	front: 'palpable',
	back: 'jk',
	right: 0,
	wrong: 6
})
```

# `f.gotWrong(stackName, id)`

This will increment the number of times a card was gotten wrong. For example:

```js
f.gotWrong('theSameAsHi', 1)
assert.deepEqual(f.get('theSameAsHi')[1], {
	front: 'palpable',
	back: 'able to be touched or felt.',
	right: 0,
	wrong: 1
})
```

# `f.gotRight(stackName, id)`

This will increment the number of times a card was gotten right. For example:

```js
f.gotRight('theSameAsHi', 1)
assert.deepEqual(f.get('theSameAsHi')[1], {
	front: 'palpable',
	back: 'able to be touched or felt.',
	right: 1,
	wrong: 1
})
```

# `f.idByFront(stackName, front)`

This will find the ID of the first card with a specific front in a stack. Here's an example:

```js
assert.equal(f.idByFront('hi', 'ostensible'), 0)
```

# `f.idsByFront(stackName, front)`

This will make a list of IDs of every card with a specific front in a stack. Here's an example:

```js
assert.deepEqual(f.idsByFront('theSameAsHi', 'ostensible'), [0])
```

# `f.save(stackName, stack)`

If you just run `f.save()` without any arguments, all of the stacks on the file system will be deleted and then all of the stacks in `f.stacks` will be saved. If you pass a stack's name, then that stack will be saved on the file system but no other stacks will be touched. If you pass a stack's name and a stack, then that stack will be saved with the stack's name.

Here's an example:

```
// Only save hi
f.save('hi')
// Save a stack (that doesn't exist) called bye, and the stack should be the same as hi
f.save('bye', f.get('hi'))

// Save everything. Note that since the stack called bye was never really inserted, it will be deleted.
f.save()
// Now the stacks hi and theSameAsHi have both been saved
```

**NOTE**: If you might run `f.save()` without any arguments, you should run `f.refresh()` ASAP because if you run `f.save()` *before* you've loaded up old flashcards, the old flashcards will be deleted. Also, remember that, `f.refresh()` **will** overwrite any changes you make.

# `f.loadStacks(refreshList)`

Returns all of the stacks from the file system. If you set `refreshList` to `true`, then this function will load the latest list of stacks from the file system. Other wise, the list of stacks will be found with `Object.keys(f.stacks)`.

So if you insert a stack and don't save it, and then you run `f.loadStacks()`, an error will be thrown because the stack will be found by `Object.keys(f.stacks)` but it will not exist on the file system. However, if you run `f.loadStacks(true)` then no error will be thrown because Flashcardz will figure out which things have actually been saved and reload them.

Here's an example:

```js
f.loadStacks() // {hi: {/* flashcards in the stack called hi */}, theSameAsHi: {/* flashcards in the stack called theSameAsHi */}}
```

# `f.loadStack(stackName)`

Given the name of a stack which has been saved on the file system, returns that stack from the file system.

Here's an example:

```js
f.loadStack('hi') // {/* flashcards in the stack called hi */}
```

# `f.getList()`

Gets a list of all of the stacks, based on what has been saved on the file system.

Here's an example:

```js
f.getList() // ['hi', 'theSameAsHi']
```

# `f.refresh()`

A shortcut for `f.stacks = f.loadStacks(true)`

If you might run `f.save()` without any arguments, you should run `f.refresh()` ASAP because if you run `f.save()` *before* you've loaded up old flashcards, the old flashcards will be deleted.

This *will* overwrite stuff.

# `f.hardest(stack, count, key)`

Given a stack, returns the hardest term. Hardness is calculated by the number of times the user got the card wrong divided by the number of times they got it right plus the number of times they got it wrong. This returns the card. Also, you don't have to provide an actual stack, you can just provide a stack's name. For example:

```js
var card = f.hardest('theSameAsHi')
assert.equal(card.front, 'palpable')
```

You can also ask for the 2 hardest, or the 3 hardest, or even the *n* hardest if you just use the count variable. For example:

```js
var cards = f.hardest('theSameAsHi', 2)
assert.equal(cards[0].front, 'palpable')
assert.equal(cards[1].front, 'ostensible')
```

You can also ask for a particular key of the hardest card. For example:

```js
assert.equal(f.hardest('theSameAsHi', 'front'), 'palpable')
```

In fact, you can combine the two features above:

```js
assert.equal(f.hardest('theSameAsHi', 2, 'front'), ['palpable', 'ostensible'])
```

# `f.easiest(stack, count, key)`

Just like `f.hardest()` except this one returns the easiest term.

# `f.import(name, type)`

Given the name of a file (`name`) and the type of file (`type`), this will "import" the file and return the file as a stack. Currently, the only type supported is 'tab/newline', in which the front and back of each card is separated by a tab and each card is separated by a newline. Here's an example:

```js
// If you're walking through the code, then don't run the following code.
// It only works if you have a file named myfile with cards
var stack = f.import(__dirname + '/myfile', 'tab/newline')
f.insertStack('myNewStack', stack)
```

# `f.quiz(stackName)`

Starts a quiz. Here's an example:

```js
f.quiz('theSameAsHi')
```

# `f.config`

Stores the configuration for Flashcardz. It's just an object, and only has one key at the moment: `path`. So if you ran `f=require('flashcardz')({path: 'x'})` then `f.config` would be `{path: 'x'}`. You can also run stuff like `f=require('flashcardz')({path: '/usr', foo: 'bar'})` for and then `f.config` will be `{path: '/usr', foo: 'bar'}`

# `f.stacks`

Stores all of the Flashcardz stacks in an object. Keys are names of stacks, and their values are actual stacks. Here's an example of what `f.stacks` may contain:

```js
{
	myStackOfFlashcards: [
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
			front: 'daiphonous',
			back: '(especially of fabric) light, delicate, and translucent.',
			right: 0,
			wrong: 0
		}
	]
}
```
