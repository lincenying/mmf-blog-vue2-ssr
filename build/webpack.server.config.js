const webpack = require('webpack')
var utils = require('./utils')
var merge = require('webpack-merge')
const base = require('./webpack.base.config')

var config = Object.assign({}, base, {
    target: 'node',
    devtool: null,
    entry: './src/server-entry.js',
    output: Object.assign({}, base.output, {
        filename: 'server/server-bundle.js',
        libraryTarget: 'commonjs2'
    }),
    externals: ['axios'],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        })
    ]
})

module.exports = config
