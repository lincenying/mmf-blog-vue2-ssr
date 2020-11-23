const moment = require('moment')

const mongoose = require('../mongoose')
const Comment = mongoose.model('Comment')
const Article = mongoose.model('Article')

/**
 * 发布评论
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.insert = (req, res) => {
    const { id, content } = req.body
    const creat_date = moment().format('YYYY-MM-DD HH:mm:ss')
    const timestamp = moment().format('X')
    const userid = req.cookies.userid || req.headers.userid
    if (!id) {
        res.json({ code: -200, message: '参数错误' })
        return
    } else if (!content) {
        res.json({ code: -200, message: '请输入评论内容' })
        return
    }
    const data = {
        article_id: id,
        userid,
        content,
        creat_date,
        is_delete: 0,
        timestamp
    }
    Comment.createAsync(data)
        .then(result => {
            return Article.updateOneAsync(
                {
                    _id: id
                },
                {
                    $inc: {
                        comment_count: 1
                    }
                }
            ).then(() => {
                res.json({ code: 200, data: result, message: '发布成功' })
            })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

/**
 * 前台浏览时, 读取评论列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getList = (req, res) => {
    const { all, id } = req.query
    let { limit, page } = req.query
    if (!id) {
        res.json({ code: -200, message: '参数错误' })
    } else {
        page = parseInt(page, 10)
        limit = parseInt(limit, 10)
        if (!page) page = 1
        if (!limit) limit = 10
        const data = {
                article_id: id
            },
            skip = (page - 1) * limit
        if (!all) {
            data.is_delete = 0
        }
        Promise.all([
            Comment.find(data)
                .sort('-_id')
                .skip(skip)
                .limit(limit)
                .exec(),
            Comment.countDocumentsAsync(data)
        ])
            .then(result => {
                const total = result[1]
                const totalPage = Math.ceil(total / limit)
                const json = {
                    code: 200,
                    data: {
                        list: result[0],
                        total,
                        hasNext: totalPage > page ? 1 : 0
                    }
                }
                res.json(json)
            })
            .catch(err => {
                res.json({ code: -200, message: err.toString() })
            })
    }
}

/**
 * 评论删除
 * @method deleteAdmin
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.deletes = (req, res) => {
    const _id = req.query.id
    Comment.updateOneAsync({ _id }, { is_delete: 1 })
        .then(() => {
            return Article.updateOneAsync({ _id }, { $inc: { comment_count: -1 } }).then(() => {
                res.json({ code: 200, message: '删除成功', data: 'success' })
            })
        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}

/**
 * 评论恢复
 * @method deleteAdmin
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.recover = (req, res) => {
    const _id = req.query.id
    Comment.updateOneAsync({ _id }, { is_delete: 0 })
        .then(() => {
            return Article.updateOneAsync({ _id }, { $inc: { comment_count: 1 } }).then(() => {
                res.json({ code: 200, message: '恢复成功', data: 'success' })
            })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}
