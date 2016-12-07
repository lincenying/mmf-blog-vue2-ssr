var fs = require('fs')
exports.fsExistsSync = function(path) {
    try {
        fs.accessSync(path, fs.F_OK)
    } catch(e) {
        return false
    }
    return true
}

exports.strlen = function(str) {
    var charCode = -1,
        len = str.length,
        realLength = 0
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
    }
    return realLength
}
