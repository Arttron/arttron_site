'use strict';
/* Настроен под проэкт arttron.pp.ua */
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rm = require( 'gulp-rm' );
var rigger = require('gulp-rigger');
var browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
var svgSprite = require("gulp-svg-sprites");
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sprites', function () {
    return gulp.src('src/svg/*.svg')
        .pipe(svgSprite({mode: "symbols"}))
        .pipe(gulp.dest("site/img"));
});

gulp.task('imgMin', () =>
        gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('site/img'))
);
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./site"
        },
        open: false
    });
});
gulp.task('bs-reload',['bundleHtml','sass','bundleJs'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/style.scss')
        .pipe(rigger())
        .pipe(sass({outputStyle: 'expanded',
            includePaths: ['node_modules/susy/sass']
        })
            .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('site/css'));
});

gulp.task( 'clean', function() {
    return gulp.src( 'site/**', { read: false })
        .pipe( rm() )
});

gulp.task('bundleHtml', function () {
    return gulp.src('src/html/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('site/'));
});

gulp.task('bundleJs', () => {
    return gulp.src('src/js/script.js')
		.pipe(rigger())
        .pipe(gulp.dest('site/js'));
});
gulp.task('JsMod', () => {
    return gulp.src('src/js-mod/*.*')
        .pipe(gulp.dest('site/js'));
});
gulp.task('copyFont', () => {
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('site/fonts'));
});
gulp.task('watch',['sprites','JsMod','copyFont','imgMin','bundleHtml','sass','bundleJs', 'browser-sync'], function () {
    gulp.watch('./src/html/*.html', ['bs-reload']);
    gulp.watch('./src/sass/*.scss', ['bs-reload']);
    gulp.watch('./src/js/*.js', ['bs-reload']);
    gulp.watch('./src/images/*', ['imgMin']);
    //gulp.watch('./site/**/*', ['bs-reload']);
});
gulp.task('runBuild',['clean'], function () {
 gulp.run('watch');
});
gulp.task('default', ['runBuild']);