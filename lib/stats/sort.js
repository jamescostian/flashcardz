// Sorts cards based on their hardness in ascending order (easiest to hardest)
module.exports.hardnessAscending = function (cardA, cardB) {
	var hardnessA = cardA.wrong / (cardA.wrong + cardA.right)
	var hardnessB = cardB.wrong / (cardB.wrong + cardB.right)
	return hardnessA - hardnessB
}

// Sorts cards based on how many times they were missed in ascending order (least missed to most missed)
module.exports.missesAscending = function (cardA, cardB) {
	return cardA.wrong - cardB.wrong
}

// Sorts cards based on how many times they were not missed in ascending order (least time correct to most times correct)
module.exports.hitsAscending = function (cardA, cardB) {
	return cardA.right - cardB.right
}
