// Returns the ID of the first card in a stack whose front has a particular string.
// If no card is found that matches said criteria, this function will return -1, similar to [].indexOf

// This could be implemented by just running f.idsByFront(stack, front)[0]
// However, this implementation is faster
module.exports = function (stack, front) {
	for (var i = 0; i < stack.length; i += 1) {
		if (stack[i].front === front) {
			return i
		}
	}
	return -1
}
