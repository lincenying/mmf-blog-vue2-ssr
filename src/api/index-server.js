import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from './config-server'

const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {
    post(url, data, cookies = {}) {
        const cookie = parseCookie(cookies)
        const key = md5(url + JSON.stringify(data) + cookies.username)
        if (config.cached && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        return axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                cookie
            }
        }).then(res => {
            if (config.cached) config.cached.set(key, res)
            return res
        })
    },
    get(url, params, cookies = {}) {
        const cookie = parseCookie(cookies)
        const key = md5(url + JSON.stringify(params) + cookies.username)
        if (config.cached && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                cookie
            }
        }).then(res => {
            if (config.cached) config.cached.set(key, res)
            return res
        })
    }
}
