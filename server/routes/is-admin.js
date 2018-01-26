var jwt = require('jsonwebtoken')
var config = require('../config')
var secret = config.secretServer

module.exports = (req, res, next) => {
    var token = req.cookies.b_user,
        userid = req.cookies.b_userid,
        username = req.cookies.b_username
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (!err && decoded.id === userid && (decoded.username === username || decoded.username === encodeURI(username))) {
                req.decoded = decoded
                next()
            } else {
                res.cookie('b_user', '', { maxAge: 0 })
                res.cookie('b_userid', '', { maxAge: 0 })
                res.cookie('b_username', '', { maxAge: 0 })
                return res.json({
                    code: -500,
                    message: '登录验证失败',
                    data: ''
                })
            }
        })
    } else {
        return res.json({
            code: -500,
            message: '请先登录',
            data: ''
        })
    }
}
