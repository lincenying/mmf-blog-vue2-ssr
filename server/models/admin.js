const mongoose = require('../mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    username: String,
    email: String,
    password: String,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number
})

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin
