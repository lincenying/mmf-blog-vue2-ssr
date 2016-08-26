'use strict'

process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const path = require('path')
const express = require('express')
const ejs = require('ejs')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const serialize = require('serialize-javascript')
const PrettyError = require('pretty-error')
const resolve = file => path.resolve(__dirname, file)

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const app = express()

let renderer
if (isProd) {
    const bundlePath = resolve('../dist/server/server-bundle.js')
    renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'), {
        cache: require('lru-cache')({
            max: 10000
        })
    })
} else {
    require('../build/setup-dev-server')(app, bundle => {
        renderer = createBundleRenderer(bundle)
    })
}

const style = isProd ? '<link rel="stylesheet" href="/dist/css/styles.css">' : ''

app.set('views', path.resolve(__dirname, './views'))
app.engine('html',ejs.__express)
app.set('view engine', 'html')

app.use('/dist', express.static(resolve('../dist')))
app.use(favicon(resolve('../dist/static/favicon.ico')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.get('*', (req, res, next) => {
    try {
        const statusCode = 200
        const data = {
            style,
            body: ''
        }
        const context = {
            url: req.url
        }
        new Promise(resolve => {
            renderer.renderToString(context, (err, html) => {
                if (err) {
                    next(err)
                }
                data.body = html
                resolve()
            })
        }).then(() => {
            data.initialState = serialize(context.initialState, {
                isJSON: true
            })
            res.status(statusCode)
            res.render('index', data)
        })
    } catch (e) {
        next(e)
    }
})

const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

app.use((err, req, res) => {
    console.log(pe.render(err))
    const statusCode = err.status || 500
    res.status(statusCode)
    res.render('error', {
        title: 'Error',
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`)
})
