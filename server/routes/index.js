var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

var backendArticle = require('../api/backend-article'),
    backendCategory = require('../api/backend-category'),
    backendUser = require('../api/backend-user'),
    frontendArticle = require('../api/frontend-article'),
    frontendComment = require('../api/frontend-comment'),
    frontendLike = require('../api/frontend-like'),
    frontendUser = require('../api/frontend-user'),
    isAdmin = require('./is-admin'),
    isUser = require('./is-user')

// 添加管理员
router.get('/backend', (req, res) => {
    res.render('admin-add.html', { title: '添加管理员', message: '' })
})
router.post('/backend', (req, res) => {
    backendUser.insert(req, res)
})

// API
// ================ 后台 ================
// ------- 文章 -------
// 管理时, 获取文章列表
router.get('/backend/article/list', isAdmin, (req, res) => {
    backendArticle.getList(req, res)
})
// 管理时, 获取单篇文章
router.get('/backend/article/item', isAdmin, (req, res) => {
    backendArticle.getItem(req, res)
})
// 管理时, 发布文章
router.post('/backend/article/insert', isAdmin, multipartMiddleware, (req, res) => {
    backendArticle.insert(req, res)
})
// 管理时, 删除文章
router.get('/backend/article/delete', isAdmin, (req, res) => {
    backendArticle.deletes(req, res)
})
// 管理时, 恢复文章
router.get('/backend/article/recover', isAdmin, (req, res) => {
    backendArticle.recover(req, res)
})
// 管理时, 编辑文章
router.post('/backend/article/modify', isAdmin, multipartMiddleware, (req, res) => {
    backendArticle.modify(req, res)
})
// ------- 分类 -------
// 管理时, 获取分类列表
router.get('/backend/category/list', (req, res) => {
    backendCategory.getList(req, res)
})
// 管理时, 获取单个分类
router.get('/backend/category/item', (req, res) => {
    backendCategory.getItem(req, res)
})
// 管理时, 添加分类
router.post('/backend/category/insert', multipartMiddleware, isAdmin, (req, res) => {
    backendCategory.insert(req, res)
})
// 管理时, 删除分类
router.get('/backend/category/delete', isAdmin, (req, res) => {
    backendCategory.deletes(req, res)
})
// 管理时, 恢复分类
router.get('/backend/category/recover', isAdmin, (req, res) => {
    backendCategory.recover(req, res)
})
// 管理时, 编辑分类
router.post('/backend/category/modify', isAdmin, multipartMiddleware, (req, res) => {
    backendCategory.modify(req, res)
})
// ------- 管理 -------
// 后台登录
router.post('/backend/admin/login', multipartMiddleware, (req, res) => {
    backendUser.login(req, res)
})
// 管理列表
router.get('/backend/admin/list', isAdmin, (req, res) => {
    backendUser.getList(req, res)
})
// 获取单个管理员
router.get('/backend/admin/item', isAdmin, (req, res) => {
    backendUser.getItem(req, res)
})
// 编辑管理员
router.post('/backend/admin/modify', isAdmin, multipartMiddleware, (req, res) => {
    backendUser.modify(req, res)
})
// 删除管理员
router.get('/backend/admin/delete', isAdmin, (req, res) => {
    backendUser.deletes(req, res)
})
// 恢复管理员
router.get('/backend/admin/recover', isAdmin, (req, res) => {
    backendUser.recover(req, res)
})

// 用户列表
router.get('/backend/user/list', isAdmin, (req, res) => {
    frontendUser.getList(req, res)
})
// 获取单个用户
router.get('/backend/user/item', isAdmin, (req, res) => {
    frontendUser.getItem(req, res)
})
// 编辑用户
router.post('/backend/user/modify', isAdmin, multipartMiddleware, (req, res) => {
    frontendUser.modify(req, res)
})
// 删除用户
router.get('/backend/user/delete', isAdmin, (req, res) => {
    frontendUser.deletes(req, res)
})
// 恢复用户
router.get('/backend/user/recover', isAdmin, (req, res) => {
    frontendUser.recover(req, res)
})
// ------ 评论 ------
// 删除评论
router.get('/frontend/comment/delete', isAdmin, (req, res) => {
    frontendComment.deletes(req, res)
})
// 恢复评论
router.get('/frontend/comment/recover', isAdmin, (req, res) => {
    frontendComment.recover(req, res)
})
// ================= 前台 =================
// ------ 文章 ------
// 前台浏览时, 获取文章列表
router.get('/frontend/article/list', (req, res) => {
    frontendArticle.getList(req, res)
})
// 前台浏览时, 获取单篇文章
router.get('/frontend/article/item', (req, res) => {
    frontendArticle.getItem(req, res)
})
// 前台浏览时, 热门文章
router.get('/frontend/trending', (req, res) => {
    frontendArticle.getTrending(req, res)
})
// ------ 评论 ------
// 发布评论
router.post('/frontend/comment/insert', isUser, multipartMiddleware, (req, res) => {
    frontendComment.insert(req, res)
})
// 读取评论列表
router.get('/frontend/comment/list', (req, res) => {
    frontendComment.getList(req, res)
})
// ------ 用户 ------
// 前台注册
router.post('/frontend/user/insert', multipartMiddleware, (req, res) => {
    frontendUser.insert(req, res)
})
// 前台登录
router.post('/frontend/user/login', multipartMiddleware, (req, res) => {
    frontendUser.login(req, res)
})
// 前台账号读取
router.get('/frontend/user/account', isUser, (req, res) => {
    frontendUser.getItem(req, res)
})
// 前台账号修改
router.post('/frontend/user/account', isUser, multipartMiddleware, (req, res) => {
    frontendUser.account(req, res)
})
// 前台密码修改
router.post('/frontend/user/password', isUser, multipartMiddleware, (req, res) => {
    frontendUser.password(req, res)
})
// ------ 喜欢 ------
// 喜欢
router.get('/frontend/like', isUser, (req, res) => {
    frontendLike.like(req, res)
})
// 取消喜欢
router.get('/frontend/unlike', isUser, (req, res) => {
    frontendLike.unlike(req, res)
})

router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该页面'
    })
})

module.exports = router
