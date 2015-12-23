var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = require('./webpack.base.js');

webpackConfig.output.publicPath = '/public/';
webpackConfig.output.filename = 'javascripts/[name].js';
webpackConfig.output.chunkFilename = 'javascripts/[name].js';
webpackConfig.devtool = 'hidden-source-map';
webpackConfig.bail = true;
webpackConfig.sassLoaderConfig = {
  sourceMap: false,
  outputStyle: 'compressed'
};

webpackConfig.plugins.push(
  new ExtractTextPlugin('stylesheets/[name].css', {
    disable: false
  }),
  new HtmlWebpackPlugin({
    template: './assets/client/public/index.html',
    favicon: 'assets/client/public/favicon.ico',
    inject: 'body',
    hash: true,
    minify: {
      collapseWhitespace: true
    }
  }),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    }
  }),
  new webpack.DefinePlugin({
    DEBUG: false
  })
);

module.exports = webpackConfig;
