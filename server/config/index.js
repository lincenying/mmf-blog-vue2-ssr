const utils = require('../utils')
utils.creatSecret()
utils.creatMpApp()
utils.creatShiHua()
utils.creatQiNiu()
const secret = require('./secret.js')
const mpApp = require('./mpapp.js')
const shihua = require('./shihua.js')
const qiniu = require('./qiniu.js')

// MD5 加密前缀, 如用户的密码是 123456, 存到数据库将会变成 md5('!@#$%(*&^)' + '123456')
exports.md5Pre = '!@#$%(*&^)'
exports.secretServer = secret.secretServer
exports.secretClient = secret.secretServer
exports.apiId = mpApp.apiId
exports.secret = mpApp.secret
exports.shihua = shihua
exports.qiniu = qiniu
// API域名
exports.domain = 'https://api.mmxiaowu.com/'
exports.cdnDomain = 'http://cdn.mmxiaowu.com/'
