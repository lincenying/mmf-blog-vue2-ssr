const mongoose = require('mongoose')
const mongoUrl = process.env.NODE_ENV === 'docker-development' ? 'dockerized_mongo' : 'localhost'
mongoose.connect(`mongodb://${mongoUrl}/mmfblog_v2`, { useNewUrlParser: true })
mongoose.Promise = global.Promise
module.exports = mongoose
