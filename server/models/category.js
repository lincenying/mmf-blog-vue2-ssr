var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CategorySchema = new Schema({
    cate_name: String,
    cate_order: String,
    cate_num: Number,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number
})

var Category = mongoose.model('Category', CategorySchema)
Promise.promisifyAll(Category)
Promise.promisifyAll(Category.prototype)

module.exports = Category
