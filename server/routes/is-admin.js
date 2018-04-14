const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.secretServer

module.exports = (req, res, next) => {
    const { b_user, b_userid, b_username } = req.cookies
    if (b_user) {
        jwt.verify(b_user, secret, function(err, decoded) {
            if (
                !err &&
                decoded.id === b_userid &&
                (decoded.username === b_username || decoded.username === encodeURI(b_username))
            ) {
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
