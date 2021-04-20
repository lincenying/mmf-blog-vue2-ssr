/* eslint-disable no-inline-comments */
const path = require('path')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = {
    configureWebpack: {
        devtool: 'source-map',
        performance: {
            hints: 'warning', // 枚举
            maxAssetSize: 30000000, // 整数类型（以字节为单位）
            maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
            assetFilter(assetFilename) {
                // 提供资源文件名的断言函数
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
            }
        },
        plugins: [
            new SWPrecachePlugin({
                cacheId: 'mmf-blog-vue2-pwa-ssr',
                filename: 'service-worker.js',
                minify: true,
                dontCacheBustUrlsMatching: /./,
                staticFileGlobsIgnorePatterns: [/\.html$/, /\.map$/, /\.json$/],
                runtimeCaching: [
                    {
                        urlPattern: /api/,
                        handler: 'networkFirst',
                        options: {
                            networkTimeoutSeconds: 1,
                            cacheName: 'api-cache',
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
                        handler: 'networkFirst',
                        options: {
                            networkTimeoutSeconds: 1,
                            cacheName: 'cdn-cache',
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            })
        ]
    },
    chainWebpack: config => {
        const htmlSsrPlugin = config.plugins.get('html-ssr')
        if (htmlSsrPlugin) {
            htmlSsrPlugin.store.get('args')[0].chunks = []
        }

        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
        config.module.rule('eslint').uses.clear()
        config.module.rule('eslint').clear()
        config.resolve.alias.set('~', path.resolve('src'))
        if (process.env.VUE_CLI_SSR_TARGET === 'client') {
            config.resolve.alias.set('~api', path.resolve('src/api/index-client.js'))
        } else {
            config.resolve.alias.set('~api', path.resolve('src/api/index-server.js'))
        }
    },
    css: {
        loaderOptions: {}
    },
    pluginOptions: {
        ssr: {
            // ===== Listening port for `serve` command
            port: 8080,
            // ===== Listening host for `serve` command
            host: null,
            // ===== 指定公共文件路径以禁用资源预取提示
            // shouldNotPrefetch: [],
            // ===== 指定公共文件路径以禁用资源预加载提示
            // shouldNotPreload: [],
            // ===== Entry for each target
            entry: target => `./src/entry-${target}`,
            // ===== 默认的标题
            defaultTitle: 'M.M.F 小屋',
            // ===== icon 路径
            // favicon: './static/img/icons/favicon.ico',
            // ===== Enable Critical CSS
            // criticalCSS: true,
            // ===== 跳过服务器端渲染的一些请求
            skipRequests: req => {
                return req.originalUrl.indexOf('/css/') > -1 || req.originalUrl.indexOf('/js/') > -1
            },
            // ===== See https://ssr.vuejs.org/guide/build-config.html#externals-caveats
            nodeExternalsWhitelist: [/\.css$/, /\?vue&type=style/],
            // ===== 为生产服务器启用节点集群
            // clustered: false,
            // ===== 静态文件缓存控制maxAge值
            // staticCacheTtl: 1000 * 60 * 60 * 24 * 30,
            // ===== 指令回调
            directives: {
                // See 'Directive' chapter
            },
            // ===== See https://ssr.vuejs.org/guide/caching.html
            lruCacheOptions: {},
            // ===== 应用默认的中间件，如压缩，提供静态文件
            // applyDefaultServer: true,
            // ===== 扩展应用程序上下文对象
            // extendContext: (req, res, process) => ({ appMode: process.env.APP_MODE }),
            // ===== 连接自定义中间件
            extendServer: app => {
                const logger = require('morgan')
                app.use(
                    logger('[:remote-addr] ":method :url" :status :res[content-length] ":referrer" ":user-agent" ":date[web]"', {
                        skip(req) {
                            return req.url.indexOf('.map') !== -1
                        }
                    })
                )
                const express = require('express')
                // parse application/json
                app.use(express.json())
                // parse application/x-www-form-urlencoded
                app.use(express.urlencoded({ extended: true }))
                const cookieParser = require('cookie-parser')
                app.use(cookieParser())

                app.set('views', path.join(__dirname, 'dist'))
                app.engine('.html', require('ejs').__express)
                app.set('view engine', 'ejs')

                // 反向代理 => 4000端口
                app.use(
                    '/api',
                    createProxyMiddleware({
                        target: 'http://localhost:4000',
                        changeOrigin: true,
                        pathRewrite: {
                            '^/api': '/api'
                        }
                    })
                )
            },
            // ===== 在启动时将URL复制到系统剪贴板
            // copyUrlOnStart: true,
            // ==== 在渲染完成后调用
            // onRender: (res, context) => {
            //     res.setHeader(`Cache-Control', 'public, max-age=${context.maxAge}`)
            // },
            // ==== 发送到错误监控服务
            // onError: error => {},
            // ===== Paths
            distPath: path.resolve(__dirname, './dist'),
            error500Html: null,
            templatePath: path.resolve(__dirname, './dist/index.ssr.html'),
            serviceWorkerPath: path.resolve(__dirname, './dist/service-worker.js')
        }
    },
    pwa: {
        name: 'M.M.F小屋',
        themeColor: '#54d9e0',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        manifestPath: 'static/manifest.json',
        manifestOptions: {
            start_url: '/'
        },
        iconPaths: {
            favicon32: 'static/img/icons/favicon-32x32.png',
            favicon16: 'static/img/icons/favicon-16x16.png',
            appleTouchIcon: 'static/img/icons/apple-touch-icon-152x152.png',
            maskIcon: 'static/img/icons/safari-pinned-tab.svg',
            msTileImage: 'static/img/icons/msapplication-icon-144x144.png'
        }
    }
}
