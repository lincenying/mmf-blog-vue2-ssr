module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Headers', 'user')
    res.header('Access-Control-Allow-Headers', 'userid')
    res.header('Access-Control-Allow-Headers', 'useremail')
    res.header('Access-Control-Allow-Headers', 'username')
    next()
}
