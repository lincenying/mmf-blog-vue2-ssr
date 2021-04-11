const mongoose = require('../mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    cate_name: String,
    cate_order: String,
    cate_num: Number,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
