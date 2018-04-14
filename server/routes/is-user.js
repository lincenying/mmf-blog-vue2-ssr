const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.secretClient

module.exports = (req, res, next) => {
    const token = req.cookies.user || req.headers.user
    const userid = req.cookies.userid || req.headers.userid
    const username = req.cookies.username || req.headers.username
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (
                !err &&
                decoded.id === userid &&
                (decoded.username === username || decoded.username === encodeURI(username))
            ) {
                req.decoded = decoded
                next()
            } else {
                res.cookie('user', '', { maxAge: 0 })
                res.cookie('userid', '', { maxAge: 0 })
                res.cookie('username', '', { maxAge: 0 })
                return res.json({
                    code: -400,
                    message: '登录验证失败',
                    data: ''
                })
            }
        })
    } else {
        return res.json({
            code: -400,
            message: '请先登录',
            data: ''
        })
    }
}
