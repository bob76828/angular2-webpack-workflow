var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = require('./webpack.base.js');

webpackConfig.entry.dev = 'webpack-dev-server/client?http://localhost:5000';
webpackConfig.plugins.push(
  new ExtractTextPlugin('stylesheets/[name].bundle.css', {
    disable: true,
  }),
  new HtmlWebpackPlugin({
    template: 'assets/client/public/index.html',
    favicon: 'assets/client/public/favicon.ico',
    inject: 'body'
  })
);

module.exports = webpackConfig;
