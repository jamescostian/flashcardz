'use strict';
module.exports = {
	copy: require('./copy.js'),
	idsByFront: require('./ids-by-front.js'),
	idByFront: require('./id-by-front.js'),
	hardest: require('./stats/hardest.js'),
	easiest: require('./stats/easiest.js'),
	gotWrong: require('./stats/got-wrong.js'),
	gotRight: require('./stats/got-right.js'),
	convert: require('./convert'),
	dedupe: require('./dedupe.js'),
	quiz: require('./quiz/quiz.js'),
	cliQuizzer: require('./quiz/cli-quizzer.js'),
	pick: require('./stats/pick.js')
}
module.exports.indexOf = module.exports.idByFront
