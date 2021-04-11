const md5 = require('md5')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const axios = require('axios')

const mongoose = require('../mongoose')
const User = mongoose.model('User')

const config = require('../config')
const md5Pre = config.md5Pre
const secret = config.secretClient
const mpappApiId = config.apiId
const mpappSecret = config.secret
const strlen = require('../utils').strlen
const general = require('./general')
const { list, modify, deletes, recover } = general

exports.getList = (req, res) => {
    list.call(User, req, res)
}

/**
 * 用户登录
 * @method login
 * @param  {[type]}   req [description]
 * @param  {[type]}   res [description]
 * @return {[type]}       [description]
 */
exports.login = async (req, res) => {
    let json = {}
    let { username } = req.body
    const { password } = req.body
    if (username === '' || password === '') {
        res.json({ code: -200, message: '请输入用户名和密码' })
    }
    try {
        const result = await User.findOne({
            username,
            password: md5(md5Pre + password),
            is_delete: 0
        })
        if (result) {
            username = encodeURI(username)
            const id = result._id
            const email = result.email
            const remember_me = 2592000000
            const token = jwt.sign({ id, username }, secret, { expiresIn: 60 * 60 * 24 * 30 })
            res.cookie('user', token, { maxAge: remember_me })
            res.cookie('userid', id, { maxAge: remember_me })
            res.cookie('username', username, { maxAge: remember_me })
            res.cookie('useremail', email, { maxAge: remember_me })
            json = {
                code: 200,
                message: '登录成功',
                data: {
                    user: token,
                    userid: id,
                    username,
                    email
                }
            }
        } else {
            json = {
                code: -200,
                message: '用户名或者密码错误'
            }
        }
        res.json(json)
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
    }
}

/**
 * 微信登录
 * @method jscode2session
 * @param  {[type]}   req [description]
 * @param  {[type]}   res [description]
 * @return {[type]}       [description]
 */
exports.jscode2session = async (req, res) => {
    const { js_code } = req.body
    const xhr = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
            appid: mpappApiId,
            secret: mpappSecret,
            js_code,
            grant_type: 'authorization_code'
        }
    })
    res.json({ code: 200, message: '登录成功', data: xhr.data })
}
/**
 * 微信登录
 * @method login
 * @param  {[type]}   req [description]
 * @param  {[type]}   res [description]
 * @return {[type]}       [description]
 */
exports.wxLogin = async (req, res) => {
    let json = {}
    let id, token, username
    const { nickName, wxSignature, avatar } = req.body
    if (!nickName || !wxSignature) {
        res.json({ code: -200, message: '参数有误, 微信登录失败' })
    } else {
        try {
            const result = await User.findOne({
                username: nickName,
                wx_signature: wxSignature,
                is_delete: 0
            })
            if (result) {
                id = result._id
                username = encodeURI(nickName)
                token = jwt.sign({ id, username }, secret, { expiresIn: 60 * 60 * 24 * 30 })
                json = {
                    code: 200,
                    message: '登录成功',
                    data: {
                        user: token,
                        userid: id,
                        username
                    }
                }
                res.json(json)
            } else {
                const _result = await User.create({
                    username: nickName,
                    password: '',
                    email: '',
                    creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    is_delete: 0,
                    timestamp: moment().format('X'),
                    wx_avatar: avatar,
                    wx_signature: wxSignature
                })
                id = _result._id
                username = encodeURI(nickName)
                token = jwt.sign({ id, username }, secret, { expiresIn: 60 * 60 * 24 * 30 })
                res.json({
                    code: 200,
                    message: '注册成功!',
                    data: {
                        user: token,
                        userid: id,
                        username
                    }
                })
            }
        } catch (err) {
            res.json({ code: -200, message: err.toString() })
        }
    }
}

/**
 * 用户退出
 * @method logout
 * @param  {[type]}   req [description]
 * @param  {[type]}   res [description]
 * @return {[type]}       [description]
 */
exports.logout = (req, res) => {
    res.cookie('user', '', { maxAge: -1 })
    res.cookie('userid', '', { maxAge: -1 })
    res.cookie('username', '', { maxAge: -1 })
    res.cookie('useremail', '', { maxAge: -1 })
    res.json({ code: 200, message: '退出成功', data: '' })
}

/**
 * 用户注册
 * @method insert
 * @param  {[type]}    req  [description]
 * @param  {[type]}    res  [description]
 * @param  {Function}  next [description]
 * @return {json}         [description]
 */
exports.insert = async (req, res) => {
    const { email, password, username } = req.body
    if (!username || !password || !email) {
        res.json({ code: -200, message: '请将表单填写完整' })
    } else if (strlen(username) < 4) {
        res.json({ code: -200, message: '用户长度至少 2 个中文或 4 个英文' })
    } else if (strlen(password) < 8) {
        res.json({ code: -200, message: '密码长度至少 8 位' })
    } else {
        try {
            const result = await User.findOne({ username })
            if (result) {
                res.json({ code: -200, message: '该用户名已经存在!' })
            } else {
                await User.create({
                    username,
                    password: md5(md5Pre + password),
                    email,
                    creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    is_delete: 0,
                    timestamp: moment().format('X')
                })
                res.json({ code: 200, message: '注册成功!', data: 'success' })
            }
        } catch (err) {
            res.json({ code: -200, message: err.toString() })
        }
    }
}

exports.getItem = async (req, res) => {
    let json
    const userid = req.query.id || req.cookies.userid || req.headers.userid
    try {
        const result = await User.findOne({
            _id: userid,
            is_delete: 0
        })
        if (result) {
            json = { code: 200, data: result }
        } else {
            json = { code: -200, message: '请先登录, 或者数据错误' }
        }
        res.json(json)
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
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
    const { id, email, password, username } = req.body
    const data = {
        email,
        username,
        update_date: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    if (password) data.password = md5(md5Pre + password)
    modify.call(User, res, id, data)
}

/**
 * 账号编辑
 * @method account
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.account = async (req, res) => {
    const { id, email } = req.body
    const user_id = req.cookies.userid || req.headers.userid
    if (user_id === id) {
        try {
            await User.updateOne({ _id: id }, { $set: { email } })
            res.cookie('useremail', email, { maxAge: 2592000000 })
            res.json({ code: 200, message: '更新成功', data: 'success' })
        } catch (err) {
            res.json({ code: -200, message: err.toString() })
        }
    } else {
        res.json({ code: -200, message: '当前没有权限' })
    }
}

/**
 * 密码编辑
 * @method password
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.password = async (req, res) => {
    const { id, old_password, password } = req.body
    const user_id = req.cookies.userid || req.headers.userid
    if (user_id === id) {
        try {
            const result = await User.findOne({
                _id: id,
                password: md5(md5Pre + old_password),
                is_delete: 0
            })
            if (result) {
                await User.updateOne({ _id: id }, { $set: { password: md5(md5Pre + password) } })
                res.json({ code: 200, message: '更新成功', data: 'success' })
            } else {
                res.json({ code: -200, message: '原始密码错误' })
            }
        } catch (err) {
            res.json({ code: -200, message: err.toString() })
        }
    } else {
        res.json({ code: -200, message: '当前没有权限' })
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
    deletes.call(User, req, res)
}

/**
 * 用户恢复
 * @method recover
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.recover = (req, res) => {
    recover.call(User, req, res)
}
