var gulp = require('gulp');
var server = require('gulp-develop-server');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var webpackConfig = require('./../webpack.config.js');
var WebpackDevServer = require('webpack-dev-server');
var gulpHelp = require('gulp-help');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var tsconfig = require('./../tsconfig.server.json');

gulpHelp(gulp);

gulp.task('dev:cleanBuild', false, function() {
  del.sync(['build']);
  console.log('build cleaned');
});

gulp.task('dev:webpack-dev-server', false, function() {
  var compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    contentBase: './build/public',
    historyApiFallback: true,
    stats: {
      modules: false,
      chunkModules: false,
      cached: false,
      colors: true,
      chunk: false,
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false
      },
    },
  }).listen(5000, 'localhost');
});

gulp.task('dev:restart', false, function() {
  server.restart();
});

gulp.task('dev:serve', false, function() {
  server.listen({ path: './app.js' });
  gulp.watch(['assets/server/**/*.js'], ['dev:babel', 'dev:restart']);
});

gulp.task('dev:typescript', false, function() {
  return gulp.src(['typings/main.d.ts', 'assets/server/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tsconfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});


gulp.task('dev', 'Start development server', ['dev:cleanBuild'], function(callback) {
  runSequence(
    ['dev:webpack-dev-server', 'dev:typescript'],
    callback);
});
