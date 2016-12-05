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
        // if (markdown) {
        //     result[0].map(data => {
        //         data.content = marked(data.content)
        //         return data
        //     })
        // }
        var arr = [],
            data = result[0],
            total = result[1],
            totalPage = Math.ceil(total / limit),
            user_id = req.cookies.user_id

        data.forEach(item => {
            arr.push(Like.findOneAsync({ article_id: item._id, user_id }))
        })
        Promise.all(arr).then(collection => {
            data = data.map((item, index) => {
                item._doc.like_status = !!collection[index]
                return item
            })
            console.log(data)
            var json = {
                code: 200,
                data: {
                    list: data,
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
        user_id = req.cookies.user_id
    // var markdown = req.query.markdown
    if (!_id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    Promise.all([
        Article.findOneAsync({ _id, is_delete: 0 }),
        Article.findOne({ is_delete: 0 }).where('_id').gt(_id).sort('_id').exec(),
        Article.findOne({ is_delete: 0 }).where('_id').lt(_id).sort('-_id').exec(),
        Like.findOneAsync({ article_id: _id, user_id }),
        Article.updateAsync({ _id }, { '$inc':{ 'visit': 1 } })
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
        value[0].likeStatus = !! value[3]
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
