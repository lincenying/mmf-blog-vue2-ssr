const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const base = require('./webpack.base.config')

var config = merge(base, {
    target: 'node',
    devtool: false,
    entry: './src/server-entry.js',
    output: {
        filename: 'server/server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias: {
            'api-config': path.resolve(__dirname, '../src/api/config-server')
        }
    },
    node: {
        __dirname: true,
    },
    externals: Object.keys(require('../package.json').dependencies),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"',
            'global.GENTLY': false
        })
    ]
})
module.exports = config
