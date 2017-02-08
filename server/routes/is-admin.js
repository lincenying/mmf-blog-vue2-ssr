var jwt = require('jsonwebtoken')
var config = require('../config')
var secret = config.secretServer

module.exports = (req, res, next) => {
    var token = req.cookies.b_user,
        userid = req.cookies.b_userid,
        username = req.cookies.b_username
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (!err && decoded.id === userid && decoded.username === username) {
                req.decoded = decoded
                next()
            } else {
                return res.json({
                    code: -500,
                    message: '登录验证失败'
                })
            }
        })
    } else {
        return res.json({
            code: -500,
            message: '请先登录'
        })
    }
}
