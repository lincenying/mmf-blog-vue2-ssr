var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.cssLoaders = function (options) {
    options = options || {}
    // 使用插件中提取文本字符串, 生成loader
    function generateLoaders(loaders) {
        loaders = ['css', 'postcss'].concat(loaders)
        var sourceLoader = loaders.map(function (loader) {
            var extraParamChar
            if (/\?/.test(loader)) {
                loader = loader.replace(/\?/, '-loader?')
                extraParamChar = '&'
            } else {
                loader = loader + '-loader'
                extraParamChar = '?'
            }
            return loader + (options.sourceMap
                ? extraParamChar + 'sourceMap'
                : '')
        }).join('!')

        // 在生产模式下, 指定提取 CSS
        if (options.extract) {
            return ExtractTextPlugin.extract({fallbackLoader: 'vue-style-loader', loader: sourceLoader})
        } else {
            return ['vue-style-loader', sourceLoader,].join('!')
        }
    }

    // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
    return {
        css: generateLoaders([]),
        postcss: generateLoaders([]),
        less: generateLoaders(['less',]),
        sass: generateLoaders(['sass?indentedSyntax',]),
        scss: generateLoaders(['sass',]),
        stylus: generateLoaders(['stylus',]),
        styl: generateLoaders(['stylus',]),
    }
}

// 生成独立的样式文件加载器 (在 .vue 文件之外)
exports.styleLoaders = function (options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            loader: loader,
        })
    }
    return output
}
