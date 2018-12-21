const path = require('path');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
// const rev = require('gulp-rev');
// const order = require("gulp-order");
const sourcemaps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
// const watch = require('gulp-watch');

const BASE_URL = path.join(__dirname,);
const BASE_URL_JS = path.join(BASE_URL, "public", "js");
const BASE_URL_CSS = path.join(BASE_URL, "public", "css");

/*
gulp.task('minify-js', () => {
    return gulp.src([
        path.join(BASE_URL_JS, 'bundle.js')
    ])
    //.pipe(sourcemaps.init())
    .pipe(uglify())
    //.rev()
    .pipe(concat({  path: 'bundle.js', cwd: '' }))
    .pipe(gulp.dest(BASE_URL_JS));
});*/

gulp.task('minify-css', () => {
    return gulp.src([
        path.join(BASE_URL_CSS, 'styles.css')
    ])
    //.pipe(sourcemaps.init())
    .pipe(minifyCss({
        compatibility: 'ie8'
    }))
    .pipe(concat({
        path: 'bundle.css',
        cwd: ''
     }))
    //.rev()
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BASE_URL_CSS));
});

/*
gulp.task('minify-all', [
  'minify-js',
  'minify-css'
]);*/
