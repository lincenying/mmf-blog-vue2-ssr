var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mmfblog_v2', { useMongoClient: true })
mongoose.Promise = global.Promise
module.exports = mongoose
