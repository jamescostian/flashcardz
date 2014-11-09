var gulp = require('gulp')
var jshint = require('gulp-jshint')
var mocha = require('gulp-mocha')

require('./traceur.js')

gulp.task('lint', function () {
	return gulp.src(['index.js', 'traceur.js', 'gulpfile.js', 'package.json', 'lib/**/*.js', 'test/**/*.js'])
		.pipe(jshint())
})

gulp.task('test', function () {
	return gulp.src(['test/**/*.js'], { read: false })
		.pipe(mocha({
			reporter: 'dot',
			ui: 'bdd'
		}))
})

gulp.task('default', ['lint', 'test'])
