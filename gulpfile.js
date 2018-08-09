var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var babel = require('gulp-babel');

gulp.task('default', function() {
    gulp.src("*.js")
        // push polyfills file after all scripts
        .pipe(polyfiller(['Promise', 'Fetch']))
        // run then any tasks on your scripts
        .pipe(concat())
        .pipe(gulp.dest('bundle.js'));
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./public/"
    })
    gulp.watch("./public/sass/*.scss", ['sass']);
    gulp.watch("./views/*.html").on('change', browserSync.reload);
});
gulp.task('sass', function() {
    return gulp.src("./public/sass/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream());
});
gulp.task('mincss', function() {
    return gulp.src("./public/css/*.css")
        .pipe(rename({ suffix: ".min" }))
        .pipe(cleanCSS())
        .pipe(gulp.dest("./dist/css"));
})

gulp.task('js', function() {
    return gulp.src([
            'node_modules/babel-polyfill/dist/polyfill.js',
            './public/js/index.js'
        ])
        .pipe(babel())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('min', ['mincss', 'js']);
gulp.task('default', ['serve']);