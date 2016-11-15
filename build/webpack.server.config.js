const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

var config = Object.assign({}, base, {
    target: 'node',
    devtool: false,
    entry: './src/server-entry.js',
    output: Object.assign({}, base.output, {
        filename: 'server/server-bundle.js',
        libraryTarget: 'commonjs2'
    }),
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
console.log(config)
module.exports = config
