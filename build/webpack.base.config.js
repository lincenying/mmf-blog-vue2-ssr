const path = require('path')
const webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var browserslist = require('browserslist')
var HappyPack = require('happypack')

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
            loader: 'vue',
            happy: { id: 'vue' }
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            happy: { id: 'js' }
        }, {
            test: /\.json$/,
            loader: 'json'
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
    postcss: [
        autoprefixer({ browsers: browserslist('last 2 version, > 0.1%')})
    ],
    plugins: [
        new HappyPack({ id: 'vue', threads: 4 }),
        new HappyPack({ id: 'js', threads: 4 }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}
