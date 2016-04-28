var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify');

var src = 'files/',
	htmlSrc = [src + '**/*.html', src + '*.html', src + '**/*.htm', src + '*.htm'],
	cssSrc = [src + '*.css', src + '**/*.css'],
	jsSrc = [src + '*.js', src + '**/*.js'];

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('html', function() {
	return gulp.src(htmlSrc)
               .pipe(htmlmin({collapseWhitespace: true}))
               .on('error', swallowError)
			   .pipe(gulp.dest(src));
});

gulp.task('css', function() {
	return gulp.src(cssSrc)
               .pipe(cleanCSS({keepSpecialComments: 0}))
    		   .on('error', swallowError)
			   .pipe(gulp.dest(src));
});

gulp.task('js', function() {
    return gulp.src(jsSrc)
               .pipe(uglify())
               .on('error', swallowError)
			   .pipe(gulp.dest(src));
});

gulp.task('watch', function () {
    gulp.watch(htmlSrc, ['html']);
	gulp.watch(cssSrc, ['css']);
    gulp.watch(jsSrc, ['js']);
});

gulp.task('watchjs', function () {
    gulp.watch(jsSrc, ['js']);
});

gulp.task('watchhtml', function () {
    gulp.watch(htmlSrc, ['html']);
});

gulp.task('watchcss', function () {
	gulp.watch(cssSrc, ['css']);
});

gulp.task('default', ['html', 'css', 'js']);
