var md5 = require('md5')
var fs = require('fs')
var moment = require('moment')

var mongoose = require('../mongoose')
var User = mongoose.model('User')

var md5Pre = require('../config').md5Pre
const general = require('./general')

const list = general.list
const item = general.item
const modify = general.modify
const deletes = general.deletes
const recover = general.recover

exports.getList = (req, res) => {
    list(req, res, User)
}

exports.getItem = (req, res) => {
    item(req, res, User)
}

/**
 * 用户登录
 * @method login
 * @param  {[type]}   req [description]
 * @param  {[type]}   res [description]
 * @return {[type]}       [description]
 */
exports.login = (req, res) => {
    var json = {},
        password = req.body.password,
        username = req.body.username
    if (username === '' || password === '') {
        json = {
            code: -200,
            message: '请输入用户名和密码'
        }
        res.json(json)
    }
    User.findOneAsync({
        username,
        password: md5(md5Pre + password),
        is_delete: 0
    }).then(result => {
        if (result) {
            var id = result._id
            var remember_me = req.body.remember_me ? 2592000000 : 86400000
            var token = md5(id + md5Pre + username)
            res.cookie('user', token, { maxAge: remember_me })
            res.cookie('userid', id, { maxAge: remember_me })
            res.cookie('username', username, { maxAge: remember_me })
            json = {
                code: 200,
                message: '登录成功',
                data: token
            }
        } else {
            json = {
                code: -200,
                message: '用户名或者密码错误'
            }
        }
        res.json(json)
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 用户注册
 * @method insert
 * @param  {[type]}    req  [description]
 * @param  {[type]}    res  [description]
 * @param  {Function}  next [description]
 * @return {json}         [description]
 */
exports.insert = (req, res, next) => {
    var email = req.body.email,
        password = req.body.password,
        username = req.body.username

    if (!username || !password || !email) {
        res.render('admin.html', { message: '请将表单填写完整' })
    } else {
        User.findOneAsync({ username }).then(result => {
            if (result) {
                return '该用户已经存在'
            }
            return User.createAsync({
                username,
                password: md5(md5Pre + password),
                email,
                creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
                is_delete: 0,
                timestamp: moment().format('X')
            }).then(() => {
                fs.writeFileSync('./admin.lock', '')
                return '添加用户成功: '+username+', 密码: '+password
            })
        }).then(message => {
            res.render('admin.html', { message })
        }).catch(err => next(err))
    }
}

/**
 * 用户编辑
 * @method modify
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.modify = (req, res) => {
    var _id = req.body.id,
        email = req.body.email,
        password = req.body.password,
        username = req.body.username

    modify(res, User, _id, {
        email, password, username
    })
}


/**
 * 账号编辑
 * @method account
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.account = (req, res) => {
    var _id = req.body.id,
        email = req.body.email,
        user_id = req.cookie.user_id,
        username = req.body.username
    if (user_id === _id) {
        User.updateAsync({ _id }, { '$set': { email, username } }).then(() => {
            res.json({
                code: 200,
                message: '更新成功'
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
    } else {
        res.json({
            code: -200,
            message: '当前没有权限'
        })
    }
}

/**
 * 密码编辑
 * @method password
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.password = (req, res) => {
    var _id = req.body.id,
        old_password = req.cookie.old_password,
        password = req.body.password,
        user_id = req.cookie.user_id
    if (user_id === _id) {
        User.findOneAsync({
            _id,
            password: md5(md5Pre + old_password),
            is_delete: 0
        }).then(result => {
            if (result) {
                User.updateAsync({ _id }, { '$set': { password: md5(md5Pre + password) } }).then(() => {
                    res.json({
                        code: 200,
                        message: '更新成功'
                    })
                }).catch(err => {
                    res.json({
                        code: -200,
                        message: err.toString()
                    })
                })
            } else {
                res.json({
                    code: -200,
                    message: '原始密码错误'
                })
            }
        })
    } else {
        res.json({
            code: -200,
            message: '当前没有权限'
        })
    }
}

/**
 * 用户删除
 * @method deletes
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.deletes = (req, res) => {
    deletes(req, res, User)
}

/**
 * 用户恢复
 * @method recover
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.recover = (req, res) => {
    recover(req, res, User)
}
