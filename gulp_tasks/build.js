var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpHelp = require('gulp-help');
//var webpack = require('webpack');
//var webpackConfig = require('./../webpack.build.js');
var typescript = require('gulp-typescript');
var del = require('del');
var shell = require('gulp-shell');

gulpHelp(gulp);

gulp.task('clean_build', false, function() {
  del.sync(['build']);
  console.log('build cleaned');
});

//gulp.task('webpack', function(callback) {
//  webpack(webpackConfig, function(err, stats) {
//    callback();
//  });
//});

gulp.task('webpack', shell.task('webpack --config webpack.build.js -p'));

gulp.task('typescript', false, function() {
  return gulp.src(['typings/main.d.ts', 'assets/server/**/*.ts'])
    .pipe(typescript({
      noImplicitAny: true,
      "target": "ES5",
      "module": "commonjs",
      "removeComments": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
    }))
    .pipe(gulp.dest('build'));
});


gulp.task('build', 'Production build', ['clean_build'], function(callback) {
  runSequence(
    ['webpack', 'typescript'],
    callback);
});
