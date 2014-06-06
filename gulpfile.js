var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function () {
    gulp.src('./public/styl/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('default', ['stylus']);