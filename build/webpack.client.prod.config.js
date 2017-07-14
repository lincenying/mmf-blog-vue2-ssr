const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

const srcDir = path.resolve(__dirname, '../dist/').replace(/\\/g, "\/")
const prefixMulti = {}
prefixMulti[srcDir] = ''

module.exports = {
    devtool: false,
    module: {
        rules: [{
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: 'static/img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
        },  {
            test: /\.less/,
            loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'less-loader'])
        }]
    },
    plugins: [
        new ExtractTextPlugin('static/css/[name].[hash:7].css'),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module, count) {
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
            minimize: true
        }),
        new SWPrecachePlugin({
            cacheId: 'mmf-blog-vue2-ssr',
            filename: 'service-worker.js',
            dontCacheBustUrlsMatching: /./,
            staticFileGlobsIgnorePatterns: [/server\.html$/, /admin\.html$/, /\.map$/],
            stripPrefixMulti: prefixMulti
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'manifest', 'vendor', 'app',
            ],
            filename: 'server.html',
            template: 'src/template/server.html',
            inject: true,
            chunksSortMode (chunk1, chunk2) {
                var orders = ['manifest', 'vendor', 'app'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'manifest', 'vendor', 'admin',
            ],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            inject: true,
            chunksSortMode (chunk1, chunk2) {
                var orders = ['manifest', 'vendor', 'admin'];
                var order1 = orders.indexOf(chunk1.names[0]);
                var order2 = orders.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        })
    ]
}
