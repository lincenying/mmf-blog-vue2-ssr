'use strict'

process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const express = require('express')
const favicon = require('serve-favicon')
const serialize = require('serialize-javascript')
const proxyMiddleware = require('http-proxy-middleware')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const app = express()

// parse index.html template
const html = (() => {
    const template = fs.readFileSync(resolve('./index.html'), 'utf-8')
    const i = template.indexOf('{{ APP }}')
  // styles are injected dynamically via vue-style-loader in development
    const style = isProd ? '<link rel="stylesheet" href="/dist/css/styles.css">' : ''
    return {
        head: template.slice(0, i).replace('{{ STYLE }}', style),
        tail: template.slice(i + '{{ APP }}'.length)
    }
})()
// setup the server renderer, depending on dev/prod environment
let renderer
if (isProd) {
  // create server renderer from real fs
    const bundlePath = resolve('./dist/server/server-bundle.js')
    renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {
    require('./build/setup-dev-server')(app, bundle => {
        renderer = createBundleRenderer(bundle)
    })
}

const proxyTable = {
    '/api': {
        target: 'http://www.mmxiaowu.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    }
}
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(context, options))
})

app.use('/dist', express.static(resolve('./dist')))
app.use(favicon(resolve('./dist/static/favicon.ico')))

app.get('*', (req, res) => {
    var ss = Date.now()
    const context = { url: req.url }
    const renderStream = renderer.renderToStream(context)
    let firstChunk = true

    res.write(html.head)

    renderStream.on('data', chunk => {
        if (firstChunk) {
            // embed initial store state
            if (context.initialState) {
                res.write(`<script>window.__INITIAL_STATE__=${ serialize(context.initialState, { isJSON: true }) }</script>`)
            }
            firstChunk = false
        }
        res.write(chunk)
    })

    renderStream.on('end', () => {
        res.end(html.tail)
        console.log(`whole request: ${Date.now() - ss}ms`)
    })

    renderStream.on('error', err => {
        throw err
    })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
