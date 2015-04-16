var test = require('tape')
var hardest = require('../../lib/stats/hardest.js')

test('no division by zero', function (t) {
	t.plan(3)

	var data = [
		{
			right: 0,
			wrong: 0,
			front: 'x',
			back: 'foo'
		},
		{
			right: 0,
			wrong: 0,
			front: 'y',
			back: 'foo'
		}
	]

	t.doesNotThrow(function () {
		hardest(data)
		hardest(data.reverse())
		data[0].front = data[1].front = 'the same front side'
		hardest(data)
	}, 'works if neither card has been seen before')

	t.doesNotThrow(function () {
		data[0].right += 1
		hardest(data)
	}, 'works if one card has never been seen before')

	t.doesNotThrow(function () {
		data[0].right -= 1
		data[1].right += 1
		hardest(data)
	}, 'works if the other card has never been seen before')
})
