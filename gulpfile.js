var gulp = require('gulp');

gulp.task('lint', function () {
    var jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    gulp.src(['./public/js/*.js', './routes/*.js', './app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('build-js', function () {
    var concat = require('gulp-concat'), 
        uglify = require('gulp-uglify');

    gulp.src('./source/js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('stylus', function () {
    var stylus = require('gulp-stylus'),
        autoprefixer = require('gulp-autoprefixer');

    gulp.src('./source/styl/**/*.styl')
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('default', ['stylus', 'lint', 'build-js']);