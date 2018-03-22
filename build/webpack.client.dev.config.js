const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config')
const utils = require('./utils')

module.exports = {
    mode: 'development',
    devtool: '#source-map',
    output: {
        path: config.dev.assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[name].js'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader',
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader',
                query: {
                    name: '[name].[hash:7].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            isProd: false,
            chunks: ['app'],
            filename: 'server.html',
            template: 'src/template/server.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            isProd: false,
            chunks: ['admin'],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            inject: true,
        }),
    ],
}
