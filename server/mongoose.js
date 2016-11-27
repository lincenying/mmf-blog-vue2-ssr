var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mmfblog')
mongoose.Promise = global.Promise
module.exports = mongoose
