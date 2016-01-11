const gulp = require('gulp');
const postcss = require('gulp-postcss');
const jekyll = require('gulp-jekyll');
const coffee = require('gulp-coffee');
// const concat = require('gulp-concat');
const postcssUse = require('postcss-use');
const cp = require("child_process");
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const browserSync = require("browser-sync");
const rename = require('gulp-rename');
const include = require('gulp-include');

const SOURCE = {
  coffee: './src/js/main.coffee',
  coffee_mainfile: 'main.coffee',
  js_build: 'dist/main.js',
  dist: 'dist',
  css_build: './dist/main.css',
  css_file: 'main.css',
  css_mainfile: 'src/css/main.pcss'
}

gulp.task('css', function () {
  return gulp.src(SOURCE.css_mainfile)
    .pipe(rename(SOURCE.css_file))
    .pipe(postcss([ postcssUse({ modules: '*'}) ]))
    .pipe(gulp.dest(SOURCE.dist));
});

gulp.task('js', function() {
  return gulp.src(SOURCE.coffee)
  .pipe(include())
  //.pipe(concat(SOURCE.coffee_mainfile))
  .pipe(coffee())
  .pipe(gulp.dest(SOURCE.dist))
});

gulp.task('js-uglify', ['js'], function() {
  return gulp.src(SOURCE.js_build)
    .pipe(uglify())
    .pipe(gulp.dest(SOURCE.dist))
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./_site/"
    }
  });
});

gulp.task('build-dev', ['js', 'css'], function(done) {
  return cp.spawn("jekyll", ['build'], {stdio: 'inherit'})
  .on("close", done);
});

gulp.task('build-deploy', ['js-uglify', 'css'], function(done) {
  return cp.spawn("jekyll", ['build'], {stdio: 'inherit'})
  .on("close", done);
});

gulp.task('deploy', ['build-deploy'], function() {

});

gulp.task('dev', ['build-dev', 'watch'], function() {
  console.log('build done.');
});

gulp.task('watch', ['build-dev', 'browser-sync'], function() {
  gulp.watch([
    './src/*/**'
  ], [
    'dev-rebuild'
  ]);
});

gulp.task('dev-rebuild', ['build-dev'], browserSync.reload);