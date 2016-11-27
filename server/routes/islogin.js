var md5 = require('md5')

module.exports = (req, res, next) => {
    var user = req.cookies.user,
        userid = req.cookies.userid,
        username = req.cookies.username
    if (user !== md5(userid + "|" + username)) {
        res.clearCookie(user)
        res.clearCookie(userid)
        res.clearCookie(username)
        res.json({
            code: -500,
            message: '请先登录'
        })
    } else {
        next()
    }
}
