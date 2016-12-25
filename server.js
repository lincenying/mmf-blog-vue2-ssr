process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const express = require('express')
const compression = require('compression')
const serialize = require('serialize-javascript')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const config = require('./src/api/config-server')
const resolve = file => path.resolve(__dirname, file)

// 引入 mongoose 相关模型
require('./server/models/admin')
require('./server/models/article')
require('./server/models/category')
require('./server/models/comment')
require('./server/models/like')
require('./server/models/user')

// 引入 api 路由
const routes = require('./server/routes/index')

function createRenderer(bundle) {
    // https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return require('vue-server-renderer').createBundleRenderer(bundle, {
        cache: require('lru-cache')({
            max: 1000,
            maxAge: 1000 * 60 * 15,
        })
    })
}

function parseIndex(template) {
    const contentMarker = '<!-- APP -->'
    const i = template.indexOf(contentMarker)
    return {
        head: template.slice(0, i),
        tail: template.slice(i + contentMarker.length),
    }
}

const app = express()

// 由 html-webpack-plugin 生成
let indexHTML
let adminHTML
// 创建来自 webpack 生成的服务端包
let renderer
if (isProd) {
    // 生产模式: 从 fs 创建服务器 HTML 渲染器和索引
    renderer = createRenderer(fs.readFileSync(resolve('./dist/server/server-bundle.js'), 'utf-8'))
    indexHTML = parseIndex(fs.readFileSync(resolve('./dist/server.html'), 'utf-8'))
} else {
    // 开发模式: 设置带有热重新加载的 dev 服务器，并在文件更改时更新渲染器和索引 HTML
    require('./build/setup-dev-server')(app, {
        bundleUpdated: bundle => {
            renderer = createRenderer(bundle)
        },
        indexUpdated: index => {
            indexHTML = parseIndex(index)
        },
        adminUpdated: index => {
            adminHTML = index
        },
    })
}

// 设置静态文件缓存时间
const serve = (path, cache) => express.static(resolve(path), { maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0 })

// 引用 esj 模板引擎
app.set('views', path.join(__dirname, 'dist'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs')

app.use(favicon('./favicon.ico'))
app.use(compression({threshold: 0}))
// 日志
app.use(logger('":method :url" :status :res[content-length] ":referrer" ":user-agent"'))
// body 解析中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// cookie 解析中间件
app.use(cookieParser())
// 设置 express 根目录
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/server', serve('./dist/server'))
app.use('/static', serve('./dist/static'))
// api 路由
app.use('/api', routes)

// 前台路由, ssr 渲染
app.get(['/', '/category/:id', '/search/:qs', '/article/:id', '/about', '/trending/:by', '/user/account', '/user/password'], (req, res) => {
    if (!renderer) {
        return res.end('waiting for compilation... refresh in a moment.')
    }
    res.setHeader("Content-Type", "text/html")
    const context = {
        url: req.url
    }
    const renderStream = renderer.renderToStream(context)
    renderStream.once('data', () => {
        const { title, meta } = context.meta.inject()
        indexHTML.head = indexHTML.head.replace(/<title.*?<\/title>/g, title.text())
        indexHTML.head = indexHTML.head.replace(/<meta.*?name="description".*?\/>/g, meta.text())
        res.write(indexHTML.head)
    })
    renderStream.on('data', chunk => {
        res.write(chunk)
    })
    renderStream.on('end', () => {
        // 嵌入初始 store 状态
        if (context.initialState) {
            res.write('<script>window.__INITIAL_STATE__=' + serialize(context.initialState, {isJSON: true}) + '</script>')
        }
        res.end(indexHTML.tail)
    })
    renderStream.on('error', err => {
        if (err && err.code === '404') {
            res.status(404).end('404 | Page Not Found')
            return
        }
        // 渲染错误页面或重定向
        res.status(500).end('Internal Error 500')
        console.error(`error during render : ${req.url}`)
        console.error(err)
    })
})

// 后台渲染
app.get(['/backend', '/backend/*'], (req, res) => {
    if (isProd) {
        res.render('admin.html', { title: '登录' })
    } else {
        res.send(adminHTML)
    }
})

// 404 页面
app.get('*', (req, res) => {
    res.send('HTTP STATUS: 404')
})

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(function(err, req, res) {
    res.status(err.status || 500)
    res.send(err.message)
})

const port = process.env.PORT || config.port || 8080
app.listen(port, err => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`server started at localhost:${port}`)
})
