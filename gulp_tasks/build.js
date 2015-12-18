var gulp = require('gulp');
var runSequence = require('run-sequence');
var gulpHelp = require('gulp-help');
var typescript = require('gulp-typescript');
var del = require('del');
var shell = require('gulp-shell');
var tsconfig = require('./../tsconfig.server.json');

gulpHelp(gulp);

gulp.task('cleanBuild', false, function() {
  del.sync(['build']);
  console.log('build cleaned');
});

gulp.task('webpack', false, shell.task('webpack --config webpack.build.js -p'));

gulp.task('typescript', false, function() {
  return gulp.src(['typings/main.d.ts', 'assets/server/**/*.ts'])
    .pipe(typescript(tsconfig))
    .pipe(gulp.dest('build'));
});


gulp.task('build', 'Production build', ['cleanBuild'], function(callback) {
  runSequence(
    ['webpack', 'typescript'],
    callback);
});
