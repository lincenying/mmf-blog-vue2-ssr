const mongoose = require('../mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')

const CommentSchema = new Schema({
    article_id: String,
    userid: String,
    username: String,
    email: String,
    avatar: String,
    content: String,
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

const Comment = mongoose.model('Comment', CommentSchema)
Promise.promisifyAll(Comment)
Promise.promisifyAll(Comment.prototype)

module.exports = Comment
