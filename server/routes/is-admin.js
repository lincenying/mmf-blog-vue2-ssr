var md5 = require('md5')
var md5Pre = require('../config').md5Pre

module.exports = (req, res, next) => {
    var user = req.cookies.b_user,
        userid = req.cookies.b_userid,
        username = req.cookies.b_username
    if (user !== md5(userid + md5Pre + username)) {
        res.clearCookie('b_user')
        res.clearCookie('b_userid')
        res.clearCookie('b_username')
        res.json({
            code: -500,
            message: '请先登录'
        })
    } else {
        next()
    }
}
