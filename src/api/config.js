const port = 8080
exports.default = {
    api: 'http://localhost:'+ port +'/api/?api=true',
    proxy: 'localhost:3000',
    port
}
