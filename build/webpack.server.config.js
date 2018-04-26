const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const base = require('./webpack.base.config')

var config = merge(base, {
    mode: process.env.NODE_ENV || 'development',
    target: 'node',
    devtool: false,
    entry: './src/entry-server.js',
    output: {
        filename: 'server/server-bundle.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        alias: {
            '~api': path.resolve(__dirname, '../src/api/index-server'),
            'api-config': path.resolve(__dirname, '../src/api/config-server')
        }
    },
    node: {
        __dirname: true
    },
    // https://webpack.js.org/configuration/externals/#externals
    // https://github.com/liady/webpack-node-externals
    externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        whitelist: [/\.css$/, /\?vue&type=style/]
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"',
            'global.GENTLY': false
        }),
        new VueSSRPlugin()
    ]
})
module.exports = config
