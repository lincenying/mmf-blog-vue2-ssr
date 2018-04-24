const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('../config')
const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    entry: {
        app: './src/entry-client.js',
        admin: './src/admin.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '~src': path.resolve(__dirname, '../src'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~api': path.resolve(__dirname, '../src/api/index-client'),
            '~pages': path.resolve(__dirname, '../src/pages'),
            '~mixins': path.resolve(__dirname, '../src/mixins'),
            '~store': path.resolve(__dirname, '../src/store'),
            '~utils': path.resolve(__dirname, '../src/utils'),
            assets: path.resolve(__dirname, '../src/assets'),
            'api-config': path.resolve(__dirname, '../src/api/config-client')
        }
    },
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: isProd ? 'static/img/[name].[hash:7].[ext]' : '[name].[hash:7].[ext]',
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new VueLoaderPlugin()
    ]
}
!isProd && baseConfig.plugins.push(new FriendlyErrorsPlugin())
module.exports = baseConfig
