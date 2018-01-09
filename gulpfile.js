'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const clean = require('gulp-clean');

gulp.task('default', ['babel', 'sass', 'html', 'css'], function() {
    return gulp.src('./tmp/**/*')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('deploy', ['css'], function() {
    return gulp.src('./tmp/**/*')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['watch:all'], function() {
    return gulp.watch('./tmp/**/*', ['deploy'])
});

gulp.task('watch:all', ['watch:sass', 'watch:js', 'watch:html']);

gulp.task('babel', function(){
    return gulp.src('./src/js/**/*.es6')
        .pipe(babel({
            presets: ['env']
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
    return gulp.watch(`./src/scss/**/*.scss`, ['sass']);
});

gulp.task('watch:js', function () {
    return gulp.watch(`./src/**/*.es6`, ['babel']);
});

gulp.task('watch:html', function () {
    return gulp.watch(`./**/*.html`, ['html']);
});

gulp.task('clean', function () {
    return gulp.src(['./tmp', './dist'])
        .pipe(clean());
});
