const utils = require('../utils')
utils.creatSecret()
utils.creatMpApp()
const secret = require('./secret.js')
const mpApp = require('./mpapp.js')

// MD5 加密前缀, 如用户的密码是 123456, 存到数据库将会变成 md5('!@#$%(*&^)' + '123456')
exports.md5Pre = '!@#$%(*&^)'
exports.secretServer = secret.secretServer
exports.secretClient = secret.secretServer
exports.apiId = mpApp.apiId
exports.secret = mpApp.secret
