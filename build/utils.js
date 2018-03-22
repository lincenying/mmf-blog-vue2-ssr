/**
 * @file 工具包
 * @author lincenying(lincenying@qq.com)
 */

'use strict'

const path = require('path')
const config = require('../config')

exports.assetsPath = function(newPath) {
    const assetsSubDirectory =
        process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, newPath)
}
