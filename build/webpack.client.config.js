const baseConfig = require('./webpack.base.config')
var utils = require('./utils')
var merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = Object.assign({}, baseConfig, {
    plugins: [
        // strip comments in Vue code
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        // extract vendor chunks for better caching
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/client-vendor-bundle.js'
        })
    ]
})

if (process.env.NODE_ENV === 'production') {
    // extract CSS into a single file so it's applied on initial render

    config = merge(config, {
        module: {
            loaders: utils.styleLoaders({
                sourceMap: false,
                extract: true
            })
        },
        vue: {
            loaders: utils.cssLoaders({
                sourceMap: false,
                extract: true
            })
        },
        plugins: [
            new ExtractTextPlugin('css/styles.css'),
            // this is needed in webpack 2 for minifying CSS
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            // minify JS
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    })
} else {
    config = merge(config, {
        module: {
            loaders: utils.styleLoaders()
        },
        proxy: {
            '/api/**': {
                target: 'http://www.mmxiaowu.com/',
                secure: false,
                changeOrigin: true
            }
        }
    })
}
module.exports = config
