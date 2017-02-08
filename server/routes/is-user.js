var jwt = require('jsonwebtoken')
var config = require('../config')
var secret = config.secretClient

module.exports = (req, res, next) => {
    var token = req.cookies.user,
        userid = req.cookies.userid,
        username = req.cookies.username
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (!err && decoded.id === userid && decoded.username === username) {
                req.decoded = decoded
                next()
            } else {
                return res.json({
                    code: -400,
                    message: '登录验证失败'
                })
            }
        })
    } else {
        return res.json({
            code: -400,
            message: '请先登录'
        })
    }
}
