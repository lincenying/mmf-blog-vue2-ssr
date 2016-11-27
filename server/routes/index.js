var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

var article = require('../api/article'),
    comment = require('../api/comment'),
    isLogin = require('./islogin'),
    user = require('../api/user')

// 添加管理员
router.get('/admin', (req, res) => {
    res.render('admin.html', { title: '添加管理员', message: '' })
})
router.post('/admin', (req, res) => {
    user.insertUser(req, res)
})

// API
// 管理时, 获取文章列表
router.get('/admin/topics', isLogin, (req, res) => {
    article.getAdminTopics(req, res)
})
// 管理时, 获取单篇文章
router.get('/admin/article', isLogin, (req, res) => {
    article.getAdminArticle(req, res)
})
// 管理时, 发布文章
router.post('/admin/article/post', multipartMiddleware, isLogin, (req, res) => {
    article.postArticle(req, res)
})
// 管理时, 删除文章
router.get('/admin/article/delete', isLogin, (req, res) => {
    article.deleteArticle(req, res)
})
// 管理时, 恢复文章
router.get('/admin/article/recover', isLogin, (req, res) => {
    article.recoverArticle(req, res)
})
// 管理时, 编辑文章
router.post('/admin/article/modify', multipartMiddleware, isLogin, (req, res) => {
    article.modifyArticle(req, res)
})
// 前台浏览时, 获取文章列表
router.get('/frontend/topics', (req, res) => {
    article.getTopics(req, res)
})
// 前台浏览时, 获取单篇文章
router.get('/frontend/article', (req, res) => {
    article.geArticle(req, res)
})
// 发布评论
router.post('/frontend/comment/post', multipartMiddleware, (req, res) => {
    comment.postComment(req, res)
})
// 读取评论列表
router.get('/frontend/comment/list', (req, res) => {
    comment.getComment(req, res)
})
// 登录
router.post('/frontend/login', multipartMiddleware, (req, res) => {
    user.login(req, res)
})

router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该页面'
    })
})

module.exports = router
