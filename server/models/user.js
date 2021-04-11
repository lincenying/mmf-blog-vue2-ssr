const mongoose = require('../mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number,
    wx_avatar: String,
    wx_signature: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User
