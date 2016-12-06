var md5 = require('md5')
var md5Pre = require('../config').md5Pre

module.exports = (req, res, next) => {
    var user = req.cookies.user,
        userid = req.cookies.userid,
        username = req.cookies.username
    if (user !== md5(userid + md5Pre + username)) {
        res.clearCookie('user')
        res.clearCookie('userid')
        res.clearCookie('username')
        res.json({
            code: -400,
            message: '请先登录'
        })
    } else {
        next()
    }
}
