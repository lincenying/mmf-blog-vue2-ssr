import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from './config-server'

const SSR = global.__VUE_SSR_CONTEXT__
const cookies = SSR.cookies || {}
const username = cookies.username || ''
const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {
    async post(url, data) {
        const cookie = parseCookie(cookies)
        const key = md5(url + JSON.stringify(data) + username)
        if (config.cached && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        const res = await axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie
            }
        })
        if (config.cached && data.cache) config.cached.set(key, res)
        return res
    },
    async get(url, params) {
        const cookie = parseCookie(cookies)
        const key = md5(url + JSON.stringify(params) + username)
        if (config.cached && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        const res = await axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                cookie
            }
        })
        if (config.cached && params.cache) config.cached.set(key, res)
        return res
    }
}
