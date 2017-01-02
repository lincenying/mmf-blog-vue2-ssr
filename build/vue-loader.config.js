var utils = require('./utils')

var options = {
    sourceMap: true
}
if (process.env.NODE_ENV === 'production') {
    options = {
        sourceMap: false,
        extract: true,
    }
}
module.exports = {
    loaders: utils.cssLoaders(options)
}
