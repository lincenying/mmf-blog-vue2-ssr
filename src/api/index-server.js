import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from './config-server'

// const SSR = global.__VUE_SSR_CONTEXT__
// const SSRCookies = SSR.cookies || {}

const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie += item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {
    api: null,
    cookies: {},
    setCookies(value) {
        value = value || {}
        this.cookies = value
        this.api = axios.create({
            baseURL: config.api,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                cookie: parseCookie(value),
            },
            timeout: config.timeout,
        })
    },
    post(url, data) {
        if (!this.api) this.setCookies()
        const cookies = this.cookies
        const username = cookies.username || ''
        const key = md5(url + JSON.stringify(data) + username)
        if (config.cached && data.cache && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        return this.api({
            method: 'post',
            url,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        }).then(res => {
            if (config.cached && data.cache) config.cached.set(key, res)
            return res
        })
    },
    get(url, params) {
        if (!this.api) this.setCookies()
        const cookies = this.cookies
        const username = cookies.username || ''
        const key = md5(url + JSON.stringify(params) + username)
        if (config.cached && params.cache && config.cached.has(key)) {
            return Promise.resolve(config.cached.get(key))
        }
        return this.api({
            method: 'get',
            url,
            params,
        }).then(res => {
            if (config.cached && params.cache) config.cached.set(key, res)
            return res
        })
    },
}
