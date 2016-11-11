var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
    gulp.src('src/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('min',  function() {
    return gulp.src('src/*.js')
        .pipe(gulp.dest('dest'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dest'))
        // .pipe(notify({ message: 'js min ok' }));
});

gulp.task('default', ['min', 'lint']);
