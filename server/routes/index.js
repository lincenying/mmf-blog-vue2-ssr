const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

const cors = require('./cors')

const backendArticle = require('../api/backend-article')
const backendCategory = require('../api/backend-category')
const backendUser = require('../api/backend-user')

const frontendArticle = require('../api/frontend-article')
const frontendComment = require('../api/frontend-comment')
const frontendLike = require('../api/frontend-like')
const frontendUser = require('../api/frontend-user')

const isAdmin = require('./is-admin')
const isUser = require('./is-user')

router.options('*', cors)

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
router.get('/backend/article/list', isAdmin, backendArticle.getList)
// 管理时, 获取单篇文章
router.get('/backend/article/item', isAdmin, backendArticle.getItem)
// 管理时, 发布文章
router.post('/backend/article/insert', isAdmin, multipartMiddleware, backendArticle.insert)
// 管理时, 删除文章
router.get('/backend/article/delete', isAdmin, backendArticle.deletes)
// 管理时, 恢复文章
router.get('/backend/article/recover', isAdmin, backendArticle.recover)
// 管理时, 编辑文章
router.post('/backend/article/modify', isAdmin, multipartMiddleware, backendArticle.modify)
// ------- 分类 -------
// 管理时, 获取分类列表
router.get('/backend/category/list', backendCategory.getList)
// 管理时, 获取单个分类
router.get('/backend/category/item', backendCategory.getItem)
// 管理时, 添加分类
router.post('/backend/category/insert', multipartMiddleware, isAdmin, backendCategory.insert)
// 管理时, 删除分类
router.get('/backend/category/delete', isAdmin, backendCategory.deletes)
// 管理时, 恢复分类
router.get('/backend/category/recover', isAdmin, backendCategory.recover)
// 管理时, 编辑分类
router.post('/backend/category/modify', isAdmin, multipartMiddleware, backendCategory.modify)
// ------- 管理 -------
// 后台登录
router.post('/backend/admin/login', multipartMiddleware, backendUser.login)
// 管理列表
router.get('/backend/admin/list', isAdmin, backendUser.getList)
// 获取单个管理员
router.get('/backend/admin/item', isAdmin, backendUser.getItem)
// 编辑管理员
router.post('/backend/admin/modify', isAdmin, multipartMiddleware, backendUser.modify)
// 删除管理员
router.get('/backend/admin/delete', isAdmin, backendUser.deletes)
// 恢复管理员
router.get('/backend/admin/recover', isAdmin, backendUser.recover)

// 用户列表
router.get('/backend/user/list', isAdmin, frontendUser.getList)
// 获取单个用户
router.get('/backend/user/item', isAdmin, frontendUser.getItem)
// 编辑用户
router.post('/backend/user/modify', isAdmin, multipartMiddleware, frontendUser.modify)
// 删除用户
router.get('/backend/user/delete', isAdmin, frontendUser.deletes)
// 恢复用户
router.get('/backend/user/recover', isAdmin, frontendUser.recover)
// ------ 评论 ------
// 删除评论
router.get('/frontend/comment/delete', isAdmin, frontendComment.deletes)
// 恢复评论
router.get('/frontend/comment/recover', isAdmin, frontendComment.recover)
// ================= 前台 =================
// ------ 文章 ------
// 前台浏览时, 获取文章列表
router.get('/frontend/article/list', frontendArticle.getList)
// 前台浏览时, 获取单篇文章
router.get('/frontend/article/item', frontendArticle.getItem)
// 前台浏览时, 热门文章
router.get('/frontend/trending', frontendArticle.getTrending)
// ------ 评论 ------
// 发布评论
router.post('/frontend/comment/insert', isUser, multipartMiddleware, frontendComment.insert)
// 读取评论列表
router.get('/frontend/comment/list', frontendComment.getList)
// ------ 用户 ------
// 前台注册
router.post('/frontend/user/insert', multipartMiddleware, frontendUser.insert)
// 前台登录
router.post('/frontend/user/login', multipartMiddleware, frontendUser.login)
// 微信登录
router.post('/frontend/user/wxLogin', multipartMiddleware, frontendUser.wxLogin)
router.post('/frontend/user/jscode2session', multipartMiddleware, frontendUser.jscode2session)
// 前台退出
router.post('/frontend/user/logout', frontendUser.logout)
// 前台账号读取
router.get('/frontend/user/account', isUser, frontendUser.getItem)
// 前台账号修改
router.post('/frontend/user/account', isUser, multipartMiddleware, frontendUser.account)
// 前台密码修改
router.post('/frontend/user/password', isUser, multipartMiddleware, frontendUser.password)
// ------ 喜欢 ------
// 喜欢
router.get('/frontend/like', isUser, frontendLike.like)
// 取消喜欢
router.get('/frontend/unlike', isUser, frontendLike.unlike)
// 重置喜欢
router.get('/frontend/reset/like', isUser, frontendLike.resetLike)

router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该页面'
    })
})

module.exports = router
