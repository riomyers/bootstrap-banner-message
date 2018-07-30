'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const clean = require('gulp-clean');


gulp.task('babel', function(){
    return gulp.src('./src/js/**/*.es6')
        .pipe(babel({
            presets: [['env', {
                    browsers: ['last 2 versions', 'ie 10']
            }]]
        }))
        .pipe(gulp.dest('./tmp/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./tmp/css'));
});

gulp.task('css', function () {
    return gulp.src('./src/scss/**/*.css')
        .pipe(gulp.dest('./tmp/css'));
});

gulp.task('html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./tmp/'));
});

gulp.task('watch:sass', function () {
    return gulp.watch(`./src/scss/**/*.scss`, gulp.parallel('sass'));
});

gulp.task('watch:js', function () {
    return gulp.watch(`./src/**/*.es6`, gulp.parallel('babel'));
});

gulp.task('watch:html', function () {
    return gulp.watch(`./src/**/*.html`, gulp.parallel('html'));
});

gulp.task('clean', function () {
    return gulp.src(['./tmp', './dist'])
        .pipe(clean());
});

gulp.task('default', gulp.series('clean', gulp.parallel('babel', 'sass', 'html', 'css'), function() {
    return gulp.src('./tmp/**/*')
        .pipe(gulp.dest('./dist/'));
}));

gulp.task('deploy', gulp.series('css', function() {
    return gulp.src('./tmp/**/*')
        .pipe(gulp.dest('./dist/'));
}));

gulp.task('watch', gulp.parallel('watch:sass', 'watch:js', 'watch:html', function() {
    return gulp.watch(['!./tmp/**/*.css', './tmp/**/*'], gulp.parallel('deploy'))
}));
