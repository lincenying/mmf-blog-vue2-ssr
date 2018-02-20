const md5 = require('md5')
const fs = require('fs')
const moment = require('moment')
const jwt = require('jsonwebtoken')

const mongoose = require('../mongoose')
const Admin = mongoose.model('Admin')
const fsExistsSync = require('../utils').fsExistsSync
const config = require('../config')
const md5Pre = config.md5Pre
const secret = config.secretServer
const general = require('./general')
const { list, item, modify, deletes, recover } = general

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
    let json = {}
    const { password, username } = req.body
    if (username === '' || password === '') {
        json = {
            code: -200,
            message: '请输入用户名和密码'
        }
        return res.json(json)
    }
    Admin.findOneAsync({
        username,
        password: md5(md5Pre + password),
        is_delete: 0
    }).then(result => {
        if (result) {
            const _username = encodeURI(username)
            const id = result._id
            const remember_me = 2592000000
            const token = jwt.sign({ id, _username }, secret, { expiresIn: 60*60*24*30 })
            res.cookie('b_user', token, { maxAge: remember_me })
            res.cookie('b_userid', id, { maxAge: remember_me })
            res.cookie('b_username', _username, { maxAge: remember_me })
            return res.json({
                code: 200,
                message: '登录成功',
                data: token
            })
        }
        return res.json({
            code: -200,
            message: '用户名或者密码错误'
        })
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
    const { email, password, username } = req.body
    if (fsExistsSync('./admin.lock')) {
        return res.render('admin-add.html', {message: '请先把 admin.lock 删除'})
    }
    if (!username || !password || !email) {
        return res.render('admin-add.html', { message: '请将表单填写完整' })
    }
    Admin.findOneAsync({ username }).then(result => {
        if (result) {
            return '该用户已经存在'
        }
        return Admin.createAsync({
            username,
            password: md5(md5Pre + password),
            email,
            creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            is_delete: 0,
            timestamp: moment().format('X')
        }).then(() => {
            fs.writeFileSync('./admin.lock', username)
            return '添加用户成功: '+username+', 密码: '+password
        })
    }).then(message => {
        res.render('admin-add.html', { message })
    }).catch(err => next(err))
}

/**
 * 管理员编辑
 * @method modifyAdmin
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.modify = (req, res) => {
    const { id, email, password, username } = req.body
    var data = {
        email, username, update_date: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    if (password) data.password = md5(md5Pre + password)
    modify(res, Admin, id, data)
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
