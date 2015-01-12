module.exports = function (decodeMe) {
	var list = decodeMe.split('\n')
	/* istanbul ignore next */
	if (typeof list[list.length - 1] === 'undefined' || list[list.length - 1] === null || list[list.length - 1] === '') {
		list.pop()
	}
	return list.map(function (pair) {
		var split = pair.split('\t')
		var card = {
			front: split[0],
			back: split[1],
			right: 0,
			wrong: 0
		}

		if (split.length > 2) {
			card.right = parseInt(split[2])
			card.wrong = parseInt(split[3])
		}

		return card
	})
}
