var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function webpackConfig() {
    var config = {};

    config.debug = true;

    config.entry = {
        'vendor': './assets/client/vendor.ts',
        'app': './assets/client/bootstrap.ts'
    };

    config.output = {
        path: __dirname + '/build/public',
        publicPath: 'http://localhost:5000/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    };

    config.devtool = 'inline-source-map';

    config.postcss = [
        autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    config.sassLoaderConfig = {
        sourceMap: true
    };

    config.module = {
        preLoaders: [],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                query: {
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ]
                },
                exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file',
                query: {
                    name: 'images/[hash].[ext]',
                }
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file',
                query: {
                    name: 'fonts/[hash].[ext]'
                }
            },
            {
                test: /\.(html)$/,
                loader: 'raw'
            },
            {
                test: /\.(css|scss)/,
                loader: ExtractTextPlugin.extract('style',
                    'css?sourceMap!' +
                    'sass?config=sassLoaderConfig')
            }
        ],
        noParse: [/zone\.js\/dist\/.+/, /angular2\/bundles\/.+/],
        postLoaders: [],
    };

    config.plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'javascripts/vendor.js', minChunks: Infinity })
    ];

    config.devServer = {
        contentBase: './build/public',
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        },
        port: 5000,
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    };

    return config;
}

module.exports = webpackConfig();
