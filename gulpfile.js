var gulp = require('gulp');

gulp.task('lint', function () {
    var jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    gulp.src(['./source/js/*.js', './routes/*.js', './app.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('build-js', function () {
    var concat = require('gulp-concat'), 
        uglify = require('gulp-uglify');

    gulp.src('./source/js/*.js')
        .pipe(concat('main.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('stylus', function () {
    var stylus = require('gulp-stylus'),
        autoprefixer = require('gulp-autoprefixer');

    gulp.src('./source/styl/main.styl')
        .pipe(stylus({compress: true}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('server', function () {
    var nodemon = require('gulp-nodemon');

    nodemon({
        script: 'app.js',
        ext: 'html js',
        ignore: [
            '.git',
            'node_modules/**/node_modules'
        ]
    })
    .on('change', ['lint'])
    .on('restart', function () {
        console.log('nodemon restarted server.');
    });
});

gulp.task('watch', function () {
    gulp.watch(['./source/js/*.js', './source/styl/**/*.styl'], ['stylus', 'lint', 'build-js']);
});

gulp.task('default', ['stylus', 'lint', 'build-js', 'server', 'watch']);