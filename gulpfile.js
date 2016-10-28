// load the plugins
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	compass = require('gulp-compass'),
	minifyCSS = require('gulp-minify-css'),
	concatCSS = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
  ngAnnotate = require('gulp-ng-annotate'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	nodemon = require('gulp-nodemon'),
	imagemin = require('gulp-imagemin'),
	livereload = require('gulp-livereload'),
  path = require('path');

// task for livereload
gulp.task('html', function() {
	return gulp.src(['public/**/*.html'])
		.pipe(livereload())
});

// task for sass processing
gulp.task('sass', function() {
  return gulp.src('public/assets/sass/style.sass')
    .pipe(compass({
      project: path.join(__dirname, 'public/assets'),
      css: 'css',
      sass: 'sass',
			font: 'fonts',
      style: 'nested'
    }))
});

// task for css compiling
gulp.task('css', function() {
	return gulp.src(['public/libs/**/*.css', 'public/assets/css/**/*.css'])
		.pipe(concatCSS('style.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('public/assets'))
		.pipe(livereload())
});

// task for lint, minify and concat frontend js files
gulp.task('scripts', function() {

	return gulp.src(['public/assets/js/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/assets'))
    .pipe(livereload())
});

// task for angular
gulp.task('angular', function() {

	return gulp.src(['public/app/**/*.js', '!public/app/app.min.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
    .pipe(ngAnnotate())
		.pipe(concat('app.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('public/app'))
    .pipe(livereload())
});

// task for compressing images
gulp.task('img', function() {
	return gulp.src('public/assets/img-src/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/assets/img'))
    .pipe(livereload())
});

// task for watching changes
gulp.task('watch', function() {

  // using livereload
  livereload.listen();

	// watch the html files and run html task
	gulp.watch('public/**/*.html', ['html']);

	// watch the sass files and run compiling
	gulp.watch('public/assets/sass/**/*.sass', ['sass']);

	// watch the css files and run concat and minifying
	gulp.watch('public/assets/css/**/*.css', ['css']);

	// watch other js files and run scripts task
  gulp.watch('public/assets/js/**/*.js', ['scripts']);

	// watch angular and run angular
	gulp.watch(['public/app/**/*.js', '!public/app/app.min.js'], ['angular']);

});

// Nodemon
gulp.task('nodemon', function(){
	nodemon({
		script: 'server.js',
		ext: 'js less html'
	})
	.on('start', ['watch'])
	.on('change', ['watch'])
	.on('restart', function(){
		console.log('Restarted!');
	});
});

// the main gulp task
gulp.task('default', ['nodemon']);
