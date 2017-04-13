var moment = require('moment')

var mongoose = require('../mongoose')
var Comment = mongoose.model('Comment')
var Article = mongoose.model('Article')

/**
 * 发布评论
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.insert = (req, res) => {
    var content = req.body.content,
        creat_date = moment().format('YYYY-MM-DD HH:mm:ss'),
        id = req.body.id,
        timestamp = moment().format('X'),
        userid = req.cookies.userid,
        username = req.cookies.username
    username = decodeURI(username)
    if (!id) {
        res.json({ code: -200, message: '参数错误' })
        return
    } else if (!content) {
        res.json({ code: -200, message: '请输入评论内容' })
        return
    }
    var data = {
        article_id: id,
        userid,
        username,
        email: '',
        content,
        creat_date,
        is_delete: 0,
        timestamp
    }
    Comment.createAsync(data) .then(result => {
        return Article.updateAsync({
            _id: id
        }, {
            '$inc':{
                'comment_count': 1
            }
        }).then(() => {
            res.json({
                code: 200,
                data: result,
                message: '发布成功'
            })
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
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
    var all = req.query.all,
        id = req.query.id,
        limit = req.query.limit,
        page = req.query.page
    if (!id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    } else {
        page = parseInt(page, 10)
        limit = parseInt(limit, 10)
        if (!page) page = 1
        if (!limit) limit = 10
        var data = {
                article_id: id
            },
            skip = (page - 1) * limit
        if (!all) {
            data.is_delete = 0
        }
        Promise.all([
            Comment.find(data).sort('-_id').skip(skip).limit(limit).exec(),
            Comment.countAsync(data)
        ]).then(result => {
            var total = result[1]
            var totalPage = Math.ceil(total / limit)
            var json = {
                code: 200,
                data: {
                    list: result[0],
                    total,
                    hasNext: totalPage > page ? 1 : 0
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
}

/**
 * 评论删除
 * @method deleteAdmin
 * @param  {[type]}    req [description]
 * @param  {[type]}    res [description]
 * @return {[type]}        [description]
 */
exports.deletes = (req, res) => {
    var id = req.query.id
    Comment.updateAsync({ _id: id }, { is_delete: 1 }).then(() => {
        return Article.updateAsync({ _id: id }, { '$inc': { 'comment_count': -1 } }).then(() => {
            res.json({
                code: 200,
                message: '删除成功',
                data: 'success'
            })
        })
    }).catch(err => {
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
    var id = req.query.id
    Comment.updateAsync({ _id: id }, { is_delete: 0 }).then(() => {
        return Article.updateAsync({ _id: id }, { '$inc': { 'comment_count': 1 } }).then(() => {
            res.json({
                code: 200,
                message: '恢复成功',
                data: 'success'
            })
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
