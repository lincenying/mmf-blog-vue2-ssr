var mongoose = require('../mongoose')
var Article = mongoose.model('Article')
var Like = mongoose.model('Like')

// var marked = require('marked')
// var hljs = require('highlight.js')
// marked.setOptions({
//     highlight(code) {
//         return hljs.highlightAuto(code).value
//     },
//     breaks: true
// })

/**
 * 前台浏览时, 获取文章列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getList = (req, res) => {
    var by = req.query.by,
        id = req.query.id,
        key = req.query.key,
        limit = req.query.limit,
        page = req.query.page
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
    if (key) {
        var reg = new RegExp(key, 'i')
        data.title = {$regex : reg}
    }
    var sort = '-_id'
    if (by) {
        sort = '-' + by
    }

    Promise.all([
        Article.find(data).sort(sort).skip(skip).limit(limit).exec(),
        Article.countAsync(data)
    ]).then(result => {
        var arr = [],
            data = result[0],
            total = result[1],
            totalPage = Math.ceil(total / limit),
            user_id = req.cookies.userid
        var json = {
            code: 200,
            data: {
                list: data,
                total,
                hasNext: totalPage > page ? 1 : 0,
                hasPrev: page > 1
            }
        }
        if (user_id) {
            data.forEach(item => {
                arr.push(Like.findOneAsync({ article_id: item._id, user_id }))
            })
            Promise.all(arr).then(collection => {
                data = data.map((item, index) => {
                    item._doc.like_status = !!collection[index]
                    return item
                })
                json.data.list = data
                res.json(json)
            }).catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
        } else {
            data = data.map(item => {
                item._doc.like_status = false
                return item
            })
            json.data.list = data
            res.json(json)
        }
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

exports.getItem = (req, res) => {
    var _id = req.query.id,
        user_id = req.cookies.userid
    if (!_id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    Promise.all([
        Article.findOneAsync({ _id, is_delete: 0 }),
        Like.findOneAsync({ article_id: _id, user_id }),
        Article.updateAsync({ _id }, { '$inc':{ 'visit': 1 } })
    ]).then(value => {
        var json
        if (!value[0]) {
            json = {
                code: -200,
                message: '没有找到该文章'
            }
        } else {
            if (user_id) value[0]._doc.like_status = !! value[1]
            else value[0]._doc.like_status = false
            json = {
                code: 200,
                data: value[0]
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

exports.getTrending = (req, res) => {
    var limit = 5
    var data = { is_delete: 0 }
    Article.find(data).sort('-visit').limit(limit).exec().then(result => {
        var json = {
            code: 200,
            data: {
                list: result
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
