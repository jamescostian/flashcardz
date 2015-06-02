'use strict';
module.exports = {
	copy: require('./copy.js'),
	idsByFront: require('./ids-by-front.js'),
	idByFront: require('./id-by-front.js'),
	hardest: require('./stats/hardest.js'),
	easiest: require('./stats/easiest.js'),
	addHistoryEvent: require('./stats/add-history-event.js'),
	gotWrong: require('./stats/got-wrong.js'),
	gotRight: require('./stats/got-right.js'),
	rightWrong: require('./stats/right-wrong.js'),
	convert: require('./convert'),
	dedupe: require('./dedupe.js'),
	quiz: require('./quiz/quiz.js'),
	checkAnswer: require('./quiz/check-answer.js'),
	pick: require('./stats/pick.js')
}
module.exports.indexOf = module.exports.idByFront
