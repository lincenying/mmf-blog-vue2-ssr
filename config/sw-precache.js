/**
 * @file sw-precache一些设置项，staticFileGlobs主要是设置具体需要缓存的文件
 * 在webpack.prod.conf.js 中被使用
 * 可使用参考链接
 * https://www.npmjs.com/package/sw-precache-webpack-plugin 具体的配置参数选择
 * https://github.com/GoogleChrome/sw-precache#handlefetch-boolean
 * https://metaquant.org/programing/sw-precache-guide.html
 *
 * @author lincenying(lincenying@qq.com)
 */

module.exports = {
    /**
     * build 时的配置文件
     *
     * @type {Object}
     */
    build: {
        cacheId: 'sw-cache-mmf-blog-vue2-ssr',

        filename: 'service-worker.js',

        /**
         * 需缓存的文件配置
         * 需动态缓存的放到runtimeCaching中处理
         *
         * @type {Array}
         */
        staticFileGlobs: [],

        /**
         * [mergeStaticsConfig description]
         *
         * @type {boolean}
         */
        mergeStaticsConfig: true,

        /**
         * 忽略跳过的文件
         *
         * @type {Array}
         */
        staticFileGlobsIgnorePatterns: [
            // map文件不需要缓存
            /\.map$/,
            /vue-ssr-client-manifest\.json/,
            /\/backend/
        ],
        ignoreUrlParametersMatching: [
            // map文件不需要缓存
            /\.map$/,
            /vue-ssr-client-manifest\.json/,
            /\/backend/
        ],

        /**
         * 需要省略掉的前缀名
         *
         * @type {string}
         */
        stripPrefix: 'dist/',

        /**
         * 当请求路径不在缓存里的返回，对于单页应用来说，入口点是一样的
         *
         * @type {string}
         */
        navigateFallback: '/index.html',

        /**
         * 白名单包含所有的.html (for HTML imports) 和
         * 路径中含’/data/’(for dynamically-loaded data).
         *
         * @type {Array}
         */
        navigateFallbackWhitelist: [/^(?!.*\.html$|\/data\/).*/],

        /**
         * 是否压缩，默认不压缩
         *
         * @type {boolean}
         */
        minify: true,

        // maximumFileSizeToCacheInBytes: 4194304, // 最大缓存大小

        /**
         * 生成service-worker.js的文件配置模板，不配置时采用默认的配置
         * 我们做了sw的更新策略，所以在原有模板基础做了相应的修改
         *
         * @type {string}
         */
        templateFilePath: 'config/sw.tmpl.js',

        /**
         * 是否 verbose
         *
         * @type {boolean}
         */
        verbose: true,

        /**
         * 需要根据路由动态处理的文件
         *
         * @type {Array}
         */
        runtimeCaching: [
            {
                urlPattern: /\/.*/,
                handler: 'networkFirst'
            }
            // 如果在staticFileGlobs中设置相同的缓存路径，可能导致此处不起作用
            // {
            //     urlPattern: /\/fonts\//,
            //     handler: 'networkFirst',
            //     options: {
            //         cache: {
            //             maxEntries: 10,
            //             name: 'fonts-cache'
            //         }
            //     }
            // }
        ]
    }
}
