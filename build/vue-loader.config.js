var MiniCssExtractPlugin = require('mini-css-extract-plugin')

var loaders = {}
if (process.env.NODE_ENV !== 'production') {
    loaders = {
        css: 'vue-style-loader!css-loader',
        less: 'vue-style-loader!css-loader!less-loader'
    }
} else {
    loaders = {
        css: [
            {
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                use: ['vue-style-loader', 'css-loader'],
            },
        ],
        less: [
            {
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                use: ['vue-style-loader', 'css-loader', 'less-loader'],
            },
        ]
    }
}
module.exports = {
    loaders: loaders
}
