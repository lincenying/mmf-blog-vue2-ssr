const mongoose = require('../mongoose')
const Article = mongoose.model('Article')

exports.like = (req, res) => {
    const article_id = req.query.id
    const user_id = req.cookies.userid || req.headers.userid
    Article.updateOneAsync({ _id: article_id }, { $inc: { like: 1 }, $push: { likes: user_id } })
        .then(() => {
            res.json({ code: 200, message: '操作成功', data: 'success' })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

exports.unlike = (req, res) => {
    const article_id = req.query.id
    const user_id = req.cookies.userid || req.headers.userid
    Article.updateOneAsync({ _id: article_id }, { $inc: { like: -1 }, $pull: { likes: user_id } })
        .then(() => {
            res.json({ code: 200, message: '操作成功', data: 'success' })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}
exports.resetLike = (req, res) => {
    Article.find()
        .exec()
        .then(result => {
            result.forEach(item => {
                Article.findOneAndUpdateAsync({ _id: item._id }, { like: item.likes.length }, { new: true })
            })
            res.json({ code: 200, message: '操作成功', data: 'success' })
        })
}
