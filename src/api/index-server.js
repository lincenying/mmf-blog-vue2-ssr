import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
import config from './config-server'
// import { sleep } from '@/utils'
// const SSR = global.__VUE_SSR_CONTEXT__
// const SSRCookies = SSR.cookies || {}
const objToStr = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie += item + '=' + cookies[item] + '; '
    })
    return cookie
}

export default {}

export const api = cookies => {
    return {
        cookies,
        api: axios.create({
            baseURL: config.api,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                cookie: objToStr(cookies)
            },
            timeout: config.timeout
        }),
        getCookes() {
            return this.cookies
        },
        async post(url, data) {
            const cookies = this.getCookes() || {}
            const username = cookies.username || ''
            const key = md5(url + JSON.stringify(data) + username)
            if (config.cached && data.cache && config.cached.has(key)) {
                const res = config.cached.get(key)
                return Promise.resolve(res && res.data)
            }
            const res_1 = await this.api({
                method: 'post',
                url,
                data: qs.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            if (config.cached && data.cache) config.cached.set(key, res_1)
            return res_1 && res_1.data
        },
        async get(url, params) {
            const cookies = this.getCookes() || {}
            const username = cookies.username || ''
            const key = md5(url + JSON.stringify(params) + username)
            if (config.cached && params.cache && config.cached.has(key)) {
                const res = config.cached.get(key)
                return Promise.resolve(res && res.data)
            }
            return this.api({
                method: 'get',
                url,
                params
            }).then(res => {
                if (config.cached && params.cache) config.cached.set(key, res)
                return res && res.data
            })
        }
    }
}
