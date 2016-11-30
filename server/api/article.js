var mongoose = require('../mongoose')
var Article = mongoose.model('Article')
var moment = require('moment')
// var marked = require('marked')
// var hljs = require('highlight.js')
// marked.setOptions({
//     highlight(code) {
//         return hljs.highlightAuto(code).value
//     },
//     breaks: true
// })

/**
 * 管理时, 获取文章列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getAdminTopics = (req, res) => {
    var limit = req.query.limit,
        page = req.query.page
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    var skip = (page - 1) * limit
    Promise.all([
        Article.find().sort('-_id').skip(skip).limit(limit).exec(),
        Article.countAsync()
    ]).then(result => {
        var total = result[1]
        var totalPage = Math.ceil(total / limit)
        var json = {
            code: 200,
            data: {
                list: result[0],
                total,
                hasNext: totalPage > page ? 1 : 0,
                hasPrev: page > 1 ? 1 : 0
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
 * 管理时, 获取单篇文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getAdminArticle = (req, res) => {
    var id = req.query.id
    if (!id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    Article.findOneAsync({
        _id: id
    })
    .then(result => {
        res.json({
            code: 200,
            data: result
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 前台浏览时, 获取文章列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getTopics = (req, res) => {
    var id = req.query.id,
        limit = req.query.limit,
        //markdown = req.query.markdown,
        page = req.query.page,
        qs = req.query.qs
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    var data = {
            is_delete: 0
        },
        skip = (page - 1) * limit
    if (id) {
        data.category = id
    }
    if (qs) {
        var reg = new RegExp(qs, 'i')
        data.title = {$regex : reg}
    }

    Promise.all([
        Article.find(data).sort('-_id').skip(skip).limit(limit).exec(),
        Article.countAsync(data)
    ]).then(result => {
        var total = result[1]
        var totalPage = Math.ceil(total / limit)
        // if (markdown) {
        //     result[0].map(data => {
        //         data.content = marked(data.content)
        //         return data
        //     })
        // }
        var json = {
            code: 200,
            data: {
                list: result[0],
                total,
                hasNext: totalPage > page ? 1 : 0,
                hasPrev: page > 1
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
 * 前台浏览时, 获取单篇文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.geArticle = (req, res) => {
    var _id = req.query.id
//    var markdown = req.query.markdown
    if (!_id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    Promise.all([
        Article.findOneAsync({
            _id,
            is_delete: 0
        }),
        Article.findOne({
            is_delete: 0
        }).where('_id').gt(_id).sort('_id').exec(),
        Article.findOne({
            is_delete: 0
        }).where('_id').lt(_id).sort('-_id').exec(),
        Article.updateAsync({
            _id
        }, {
            '$inc':{
                'visit': 1
            }
        })
    ]).then(value => {
        var next = {
            next_id: value[1] ? value[1]._id : '',
            next_title: value[1] ? value[1].title : ''
        }

        var prev = {
            prev_id: value[2] ? value[2]._id : '',
            prev_title: value[2] ? value[2].title : ''
        }
        // if (markdown) {
        //     value[0].content = marked(value[0].content)
        // }
        var json = {
            code: 200,
            data: value[0],
            prev,
            next
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
 * 发布文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.postArticle = (req, res) => {
    var category = req.body.category,
        content = req.body.content,
        html = req.body['post-content-html-code'],
        title = req.body.title
    var data = {
        title,
        category,
        content,
        html,
        visit: 0,
        comment_count: 0,
        creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
        is_delete: 0,
        timestamp: moment().format('X')
    }
    Article.createAsync(data)
    .then(result => {
        return res.json({
            code: 200,
            user_id: result._id,
            message: '发布成功'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 管理时, 删除文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.deleteArticle = (req, res) => {
    var id = req.query.id
    Article.updateAsync({
        _id: id
    }, {
        is_delete: 1
    }).then(() => {
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
}

/**
 * 管理时, 恢复文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.recoverArticle = (req, res) => {
    var id = req.query.id
    Article.updateAsync({
        _id: id
    }, {
        is_delete: 0
    }).then(() => {
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
}

/**
 * 管理时, 编辑文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.modifyArticle = (req, res) => {
    var category = req.body.category,
        content = req.body.content,
        html = req.body['post-content-html-code'],
        id = req.body.id,
        title = req.body.title
    Article.updateAsync({
        _id: id
    }, {
        title,
        content,
        category,
        '$set':{
            html
        }
    }).then(() => {
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
}
