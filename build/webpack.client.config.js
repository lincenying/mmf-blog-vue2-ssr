const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

var config = Object.assign({}, baseConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: 'src/template/index.html'
        })
    ]
})

if (process.env.NODE_ENV === 'production') {
    config = merge(config, {
        module: {
            rules: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css', 'postcss'])
            },  {
                test: /\.less/,
                loader: ExtractTextPlugin.extract(['css', 'postcss', 'less'])
            }, {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'file',
                query: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            }]
        },
        plugins: [
            new ExtractTextPlugin('static/css/styles.[hash:7].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function(module, count) {
                    return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf('node_modules') > 0)
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({name: 'manifest', chunks: ['vendor']}),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                },
                output: {
                    comments: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                options: {
                    context: __dirname,
                    vue: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                loader: 'css-loader!postcss-loader',
                                fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader
                            }),
                            less: ExtractTextPlugin.extract({
                                loader: 'css-loader!postcss-loader!less-loader',
                                fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader
                            })
                        }
                    }
                }
            }),
            new SWPrecachePlugin({
                cacheId: 'vue-hn',
                filename: 'server/service-worker.js',
                dontCacheBustUrlsMatching: /./,
                staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
            })
        ]
    })
} else {
    config = merge(config, {
        module: {
            rules: [{
                test: /\.css$/,
                loader: 'style!css!postcss'
            }, {
                test: /\.less/,
                loader: 'style!css!postcss!less'
            }, {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'file'
            }]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ["vendor"]
            })
        ],
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            }
        }
    })
}
module.exports = config
