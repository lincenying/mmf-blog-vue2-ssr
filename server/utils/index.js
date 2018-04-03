const fs = require('fs')
const fsExistsSync = path => {
    try {
        fs.accessSync(path, fs.F_OK)
    } catch (e) {
        return false
    }
    return true
}
exports.fsExistsSync = fsExistsSync

exports.strlen = str => {
    let charCode = -1
    let realLength = 0
    const len = str.length
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
    }
    return realLength
}

exports.creatSecret = () => {
    if (!fsExistsSync('./server/config/secret.js')) {
        const secretServer = Math.random() * 1000000
        const secretClient = Math.random() * 1000000
        const secret = `exports.secretServer = '${secretServer}'
exports.secretClient = '${secretClient}'`
        fs.writeFileSync('./server/config/secret.js', secret)
    }
}

exports.creatMpApp = () => {
    if (!fsExistsSync('./server/config/mpapp.js')) {
        const secret = `exports.apiId = ''
exports.secret = ''`
        fs.writeFileSync('./server/config/mpapp.js', secret)
    }
}
