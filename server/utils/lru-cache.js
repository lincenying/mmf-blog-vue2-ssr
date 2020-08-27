const lruCache = require('lru-cache')

const meizituCache = new lruCache({
    max: 1000,
    maxAge: 1000 * 60 * 60 * 24 * 7
})

exports.meizituCache = meizituCache

const douyinCache = new lruCache({
    max: 1000,
    maxAge: 1000 * 60 * 60 * 1
})

exports.douyinCache = douyinCache
