const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const config = require('../config')
const utils = require('./utils')
const srcDir = path.resolve(__dirname, '../dist/').replace(/\\/g, '/')
const prefixMulti = {}
prefixMulti[srcDir] = ''

module.exports = {
    mode: 'production',
    performance: {
        maxAssetSize: 500000,
        maxEntrypointSize: 1000000,
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js')
        }
    },
    devtool: false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js')
    },
    module: {
        rules: [
            ...utils.styleLoaders({
                sourceMap: false,
                extract: true,
                usePostCSS: true
            })
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -20,
                    chunks: 'all'
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
                cache: true,
                sourceMap: config.build.productionSourceMap,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    // 避免 cssnano 重新计算 z-index
                    // safe: true
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: utils.assetsPath('css/[name].[contenthash:7].css'),
            chunkFilename: utils.assetsPath('css/[name].[contenthash:7].css')
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new SWPrecacheWebpackPlugin(config.swPrecache.build),
        new HtmlWebpackPlugin({
            isProd: true,
            chunks: ['manifest', 'vendors', 'app'],
            filename: 'server.html',
            template: 'src/template/server.html',
            inject: true,
            chunksSortMode(chunk1, chunk2) {
                var orders = ['manifest', 'vendors', 'app']
                var order1 = orders.indexOf(chunk1.names[0])
                var order2 = orders.indexOf(chunk2.names[0])
                return order1 - order2
            }
        }),
        new HtmlWebpackPlugin({
            isProd: true,
            chunks: ['manifest', 'vendors', 'admin'],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            inject: true,
            chunksSortMode(chunk1, chunk2) {
                var orders = ['manifest', 'vendors', 'admin']
                var order1 = orders.indexOf(chunk1.names[0])
                var order2 = orders.indexOf(chunk2.names[0])
                return order1 - order2
            }
        })
    ]
}
