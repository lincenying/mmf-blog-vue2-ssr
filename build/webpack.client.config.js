const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.client.dev.config')
const prodConfig = require('./webpack.client.prod.config')
const utils = require('./utils')
const merge = require('webpack-merge')

var config = merge(baseConfig, {
    module: {
        rules: utils.styleLoaders()
    }
})

if (process.env.NODE_ENV === 'production') {
    config = merge(config, devConfig)
} else {
    config = merge(config, prodConfig)
}
module.exports = config
