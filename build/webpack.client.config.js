const baseConfig = require('./webpack.base.config')
const utils = require('./utils')
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

var config = merge(baseConfig, {
    resolve: {
        alias: {
            'api-config': path.resolve(__dirname, '../src/api/config-client')
        }
    },
    module: {
        rules: utils.styleLoaders()
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new CopyWebpackPlugin([{
            from: 'favicon.ico',
            to: path.join(__dirname, '../dist')
        }, {
            from: 'static/editor.md/**/*',
            to: path.join(__dirname, '../dist')
        }, {
            from: 'src/template/admin.html',
            to: path.join(__dirname, '../dist')
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
})

if (process.env.NODE_ENV === 'production') {
    config = merge(config, {
        module: {
            rules: [{
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                query: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            }]
        },
        plugins: [
            new ExtractTextPlugin('static/css/[name].[hash:7].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function(module, count) {
                    return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf('node_modules') > 0)
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({name: 'manifest', chunks: ['vendor']}),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new SWPrecachePlugin({
                cacheId: 'vue-hn',
                filename: 'server/service-worker.js',
                dontCacheBustUrlsMatching: /./,
                staticFileGlobsIgnorePatterns: [/server\.html$/, /\.map$/]
            }),
            new HtmlWebpackPlugin({
                chunks: [
                    'manifest', 'vendor', 'app',
                ],
                filename: 'server.html',
                template: 'src/template/server.html',
                inject: true,
            }),
            new HtmlWebpackPlugin({
                chunks: [
                    'manifest', 'vendor', 'login',
                ],
                filename: 'login.html',
                template: 'src/template/login.html',
                inject: true,
            })
        ]
    })
} else {
    config = merge(config, {
        module: {
            rules: [{
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            }]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ["vendor"]
            }),
            new HtmlWebpackPlugin({
                chunks: [
                    'vendor', 'app',
                ],
                filename: 'server.html',
                template: 'src/template/server.html',
                inject: true,
            }),
            new HtmlWebpackPlugin({
                chunks: [
                    'vendor', 'login',
                ],
                filename: 'login.html',
                template: 'src/template/login.html',
                inject: true,
            })
        ]
    })
}
module.exports = config
