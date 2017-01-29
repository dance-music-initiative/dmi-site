/*eslint-env node*/
'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');

const ASSET_PATH = 'assets';

module.exports = {
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
    },
    recordsPath: path.join(__dirname, '.records'),
    entry: './js/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: `${ASSET_PATH}/[chunkhash].js`,
        chunkFilename: `${ASSET_PATH}/[id].[chunkhash].js`,
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|vendor)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015'],
                },
            },
            {
                test: /\.(png|jpe?g|svg|gif|ttf|woff2?|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loaders: [
                    `file?name=${ASSET_PATH}/[hash].[ext]`,
                    'image-webpack?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
                ],
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?sourceMap!less?sourceMap',
                    { allChunks: true }
                ),
            },
            {
                test: /\.(json|xml)$/i,
                loaders: [
                    `file?name=${ASSET_PATH}/[hash].[ext]`,
                ],
            },
        ],
    },
    plugins: [
        // don't emit output when there are errors
        new NoErrorsPlugin(),

        // extract inline css into separate 'styles.css'
        new ExtractTextPlugin(`${ASSET_PATH}/[hash].css`),

        // create marketing html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './html/index.ejs',
            favicon: './images/favicons/favicon.ico',
            title: 'Dance Music Initiative',
            cache: true,
        }),
    ],
};
