const path = require('path')
const webpack = require('webpack')

module.exports = {
    performance: {
        hints: false
    },
    entry: {
        app: './src/entry-client.js',
        admin: './src/admin.js',
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'static/js/[name].[chunkhash:7].js'
    },
    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        modules: [
            path.join(__dirname, '../node_modules')
        ],
        alias: {
            '~src': path.resolve(__dirname, '../src'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~api': path.resolve(__dirname, '../src/api/index-client'),
            '~pages': path.resolve(__dirname, '../src/pages'),
            '~store': path.resolve(__dirname, '../src/store'),
            '~utils': path.resolve(__dirname, '../src/utils'),
            'api-config': path.resolve(__dirname, '../src/api/config-client')
        }
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, '../node_modules')
        ]
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
}
