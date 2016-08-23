import request from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import {inBrowser} from '../tools/command'

request.defaults.baseURL = 'http://www.mmxiaowu.com/api'
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

request.interceptors.request.use(function (config) {
    if (inBrowser) NProgress.start()
    return config
}, function (error) {
    return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
    if (inBrowser) NProgress.done()
    return response
}, function (error) {
    return Promise.reject(error)
})

export const getTopics = config => {
    return request.post('/', qs.stringify(config))
}

export const getArticle = id => {
    return request.get('/?action=article&markdown=1&id=' + id)
}

export const getComment = ({id, page, limit }) => {
    return request.get('/?action=comment&id=' + id + "&page=" + page + "&limit=" + limit)
}

export const getAdminTopics = config => {
    return request.post('/', qs.stringify(config))
}

export const getAdminArticle = id => {
    return request.get('/?action=getArticle&id=' + id)
}

export const deleteArticle = id => {
    return request.get('/?action=delete&id=' + id)
}

export const recoverArticle = id => {
    return request.get('/?action=recover&id=' + id)
}
