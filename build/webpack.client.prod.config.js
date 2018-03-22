const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const SwRegisterWebpackPlugin = require('sw-register-webpack-plugin')

const config = require('../config')
const utils = require('./utils')
const srcDir = path.resolve(__dirname, '../dist/').replace(/\\/g, "\/")
const prefixMulti = {}
prefixMulti[srcDir] = ''

module.exports = {
    mode: 'production',
    devtool: false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js')
    },
    module: {
        rules: [{
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'static/img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
        },  {
            test: /\.less/,
            loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'less-loader'])
        }]
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -20,
                    chunks: "all"
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                sourceMap: config.build.productionSourceMap,
                parallel: true
            })
        ]
    },
    plugins: [
        new ExtractTextPlugin('static/css/[name].[hash:7].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new SWPrecacheWebpackPlugin(config.swPrecache.build),
        new SwRegisterWebpackPlugin({
            prefix: '/',
            filePath: path.resolve(__dirname, '../src/sw-register.js')
        }),
        new HtmlWebpackPlugin({
            isProd: true,
            chunks: [
                'manifest', 'vendors', 'app',
            ],
            filename: 'server.html',
            template: 'src/template/server.html',
            inject: true,
            chunksSortMode (chunk1, chunk2) {
                var orders = ['manifest', 'vendors', 'app'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        new HtmlWebpackPlugin({
            isProd: true,
            chunks: [
                'manifest', 'vendors', 'admin',
            ],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            inject: true,
            chunksSortMode (chunk1, chunk2) {
                var orders = ['manifest', 'vendors', 'admin'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        })
    ]
}
