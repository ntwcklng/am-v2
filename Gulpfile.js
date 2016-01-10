var gulp = require('gulp');
var postcss = require('gulp-postcss');
var jekyll = require('gulp-jekyll');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var postcssUse = require('postcss-use');
var cp = require("child_process");
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var browserSync = require("browser-sync");

var SOURCE = {
  coffee: './src/js/*.coffee',
  coffee_mainfile: 'main.coffee',
  js_build: 'dist/main.js',
  dist: 'dist',
  css_mainfile: 'src/css/main.css'
}

gulp.task('css', function () {
  return gulp.src(SOURCE.css_mainfile)
    .pipe(postcss([ postcssUse({ modules: '*'}) ]))
    .pipe(gulp.dest(SOURCE.dist));
});

gulp.task('js', function() {
  return gulp.src(SOURCE.coffee)
  .pipe(concat(SOURCE.coffee_mainfile))
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