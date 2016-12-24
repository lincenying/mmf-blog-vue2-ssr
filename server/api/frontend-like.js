var moment = require('moment')
var mongoose = require('../mongoose')
var Article = mongoose.model('Article')
var Like = mongoose.model('Like')

exports.like = (req, res) => {
    var article_id = req.query.id
    var user_id = req.cookies.userid
    var data = {
        article_id,
        user_id,
        creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
        timestamp: moment().format('X')
    }
    Like.findOneAsync({ article_id, user_id }).then(result => {
        if (result) {
            res.json({
                code: -200,
                message: '你已经赞过了!'
            })
        } else {
            Like.createAsync(data).then(() => {
                return Article.updateAsync({ _id: article_id }, { '$inc': { 'like': 1 } }).then(() => {
                    return res.json({
                        code: 200,
                        message: '操作成功',
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
    })
}

exports.unlike = (req, res) => {
    var article_id = req.query.id
    var user_id = req.cookies.userid
    Like.removeAsync({ article_id, user_id }).then(() => {
        return Article.updateAsync({ _id: article_id }, { '$inc': { 'like': -1 } }).then(() => {
            return res.json({
                code: 200,
                message: '操作成功',
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
