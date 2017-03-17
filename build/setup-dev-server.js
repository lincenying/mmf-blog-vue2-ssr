const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')

module.exports = function setupDevServer(app, opts) {
    // modify client config to work with hot middleware
    clientConfig.entry.app = ['./build/dev-client', clientConfig.entry.app]
    clientConfig.entry.admin = ['./build/dev-client', clientConfig.entry.admin]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())

    // dev middleware
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })
    app.use(devMiddleware)
    clientCompiler.plugin('done', () => {
        const fs = devMiddleware.fileSystem
        const filePath = path.join(clientConfig.output.path, 'server.html')
        if (fs.existsSync(filePath)) {
            const index = fs.readFileSync(filePath, 'utf-8')
            opts.indexUpdated(index)
        }
        const adminPath = path.join(clientConfig.output.path, 'admin.html')
        if (fs.existsSync(adminPath)) {
            const admin = fs.readFileSync(adminPath, 'utf-8')
            opts.adminUpdated(admin)
        }
    })

    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler))

    // watch and update server renderer
    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err)
            throw err
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-bundle.json')
        opts.bundleUpdated(JSON.parse(mfs.readFileSync(bundlePath, 'utf-8')))
    })
}
