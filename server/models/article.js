const mongoose = require('../mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    title: String,
    content: String,
    html: String,
    toc: String,
    category: String,
    category_name: String,
    visit: Number,
    like: Number,
    comment_count: Number,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number,
    likes: [String]
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
