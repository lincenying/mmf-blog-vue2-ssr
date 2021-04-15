const mongoose = require('../mongoose')
const Article = mongoose.model('Article')

exports.like = async (req, res) => {
    const article_id = req.query.id
    const user_id = req.cookies.userid || req.headers.userid
    try {
        const result = await Article.findOne({ _id: article_id, is_delete: 0 })
        if (!result.likes || result.likes.findIndex(item => item === user_id) === -1) {
            await Article.updateOne({ _id: article_id }, { $inc: { like: 1 }, $push: { likes: user_id } })
            res.json({ code: 200, message: '操作成功', data: 'success' })
        }
        res.json({ code: 200, message: '操作成功', data: 'success' })
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
    }
}

exports.unlike = async (req, res) => {
    const article_id = req.query.id
    const user_id = req.cookies.userid || req.headers.userid
    try {
        await Article.updateOne({ _id: article_id }, { $inc: { like: -1 }, $pullAll: { likes: [user_id] } })
        res.json({ code: 200, message: '操作成功', data: 'success' })
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
    }
}
exports.resetLike = async (req, res) => {
    try {
        const result = await Article.find().exec()
        const length = result.length
        for (let i = 0; i < length; i++) {
            const item = result[i]
            await Article.findOneAndUpdate({ _id: item._id }, { like: item.likes.length }, { new: true })
        }
        res.json({ code: 200, message: '操作成功', data: 'success' })
    } catch (err) {
        res.json({ code: -200, message: err.toString() })
    }
}
