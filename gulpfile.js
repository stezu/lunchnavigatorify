var gulp = require('gulp');

gulp.task('lint', function () {
    var jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    gulp.src('./public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('stylus', function () {
    var stylus = require('gulp-stylus');

    gulp.src('./public/styl/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('default', ['stylus', 'lint']);