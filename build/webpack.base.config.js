const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const projectRoot = path.resolve(__dirname, '../')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    performance: {
        hints: false
    },
    entry: {
        app: './src/client-entry.js',
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
            '~api': path.resolve(__dirname, '../src/api'),
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
    externals: {
        'jquery': 'jQuery'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueConfig
        }, {
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
        }),
        new CopyWebpackPlugin([{
            from: 'robots.txt',
            to: path.join(__dirname, '../dist')
        }, {
            from: 'favicon.ico',
            to: path.join(__dirname, '../dist')
        }, {
            from: 'static/images/**/*',
            to: path.join(__dirname, '../dist')
        }, {
            from: 'src/template/admin-add.html',
            to: path.join(__dirname, '../dist')
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}
