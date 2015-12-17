var gulp = require('gulp');
var requireDir = require('require-dir');
var gulpHelp = require('gulp-help');

requireDir('./gulp_tasks');
gulpHelp(gulp);
