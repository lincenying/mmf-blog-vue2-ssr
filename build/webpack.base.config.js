const path = require('path')
const webpack = require('webpack')
const projectRoot = path.resolve(__dirname, '../')
module.exports = {
    devtool: '#source-map',
    entry: {
        app: './src/client-entry.js',
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'js/client-bundle.js'
    },
    resolveLoader: {
        root: path.join(__dirname, '../node_modules'),
    },
    externals: {
        'jquery': 'jQuery'
    },
    module: {
        preLoaders: [{
            test: /\.vue$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loader: 'eslint',
            include: projectRoot,
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file',
            query: {
                name: 'images/[name].[ext]?[hash]'
            }
        }],
        eslint: {
            formatter: require('eslint-friendly-formatter')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}
