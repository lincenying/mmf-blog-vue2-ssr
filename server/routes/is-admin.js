var md5 = require('md5')
var md5Pre = require('../config')

module.exports = (req, res, next) => {
    var user = req.cookies._user,
        userid = req.cookies._userid,
        username = req.cookies._username
    if (user !== md5(userid + md5Pre + username)) {
        res.clearCookie('_user')
        res.clearCookie('_userid')
        res.clearCookie('_username')
        res.json({
            code: -500,
            message: '请先登录'
        })
    } else {
        next()
    }
}
