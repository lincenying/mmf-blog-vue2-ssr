var md5 = require('md5')
var fs = require('fs')
var moment = require('moment')

var mongoose = require('../mongoose')
var Admin = mongoose.model('Admin')
var fsExistsSync = require('../utils').fsExistsSync
var md5Pre = require('../config').md5Pre
const general = require('./general')

const list = general.list
const item = general.item
const modify = general.modify
const deletes = general.deletes
const recover = general.recover

/**
 * 获取管理员列表
 * @method getList
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getList = (req, res) => {
    list(req, res, Admin)
}

/**
 * 获取单个管理员
 * @method getItem
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getItem = (req, res) => {
    item(req, res, Admin)
}

/**
 * 管理员登录
 * @method loginAdmin
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
    Admin.findOneAsync({
        username,
        password: md5(md5Pre + password),
        is_delete: 0
    })
    .then(result => {
        if (result) {
            var id = result._id
            var remember_me = req.body.remember_me ? 2592000000 : 86400000
            var token = md5(id + md5Pre + username)
            res.cookie('_user', token, { maxAge: remember_me })
            res.cookie('_userid', id, { maxAge: remember_me })
            res.cookie('_username', username, { maxAge: remember_me })
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
 * 初始化时添加管理员
 * @method insertAdmin
 * @param  {[type]}    req  [description]
 * @param  {[type]}    res  [description]
 * @param  {Function}  next [description]
 * @return {json}         [description]
 */
exports.insert = (req, res, next) => {
    var email = req.body.email,
        password = req.body.password,
        username = req.body.username

    if (fsExistsSync('./admin.lock')) {
        res.render('add-admin.html', {message: '请先把 admin.lock 删除'})
    } else {
        if (!username || !password || !email) {
            res.render('admin.html', { message: '请将表单填写完整' })
        } else {
            Admin.findOneAsync({
                username
            })
            .then(result => {
                if (result) {
                    return '该用户已经存在'
                }
                return Admin.createAsync({
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
                res.render('add-admin.html', { message })
            }).catch(err => next(err))
        }
    }
}

/**
 * 管理员编辑
 * @method modifyAdmin
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.modify = (req, res) => {
    var _id = req.body.id,
        email = req.body.email,
        password = req.body.password,
        username = req.body.username

    modify(res, Admin, _id, {
        email, password, username
    })
}

/**
 * 管理员删除
 * @method deletes
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.deletes = (req, res) => {
    deletes(req, res, Admin)
}

/**
 * 管理员恢复
 * @method recover
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.recover = (req, res) => {
    recover(req, res, Admin)
}
