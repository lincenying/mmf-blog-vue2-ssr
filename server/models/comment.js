const mongooseAutopopulate = require('mongoose-autopopulate')

const mongoose = require('../mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    article_id: String,
    userid: { type: Schema.Types.ObjectId, ref: 'User', autopopulate: { select: '_id email username' } },
    content: String,
    creat_date: String,
    is_delete: Number,
    timestamp: Number
})

CommentSchema.plugin(mongooseAutopopulate)
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
