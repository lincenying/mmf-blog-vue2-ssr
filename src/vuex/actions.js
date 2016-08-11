import request from 'axios'
import qs from 'qs'

request.defaults.baseURL = 'http://www.mmxiaowu.com/api'
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const getTopics = ({ commit, state }, config) => {
    return request.post('/', qs.stringify(config)).then(response => {
        if (response.statusText === 'OK') {
            commit('TOPICS_LIST', {
                ...response.data,
                page: config.page,
                path: state.route.fullPath
            })
        }
    }).catch(error => {
        console.log(error)
    })
}

export const getArticle = ({ commit, state: {route: { params: { id }}} }) => {
    return request.get('/?action=article&markdown=1&id=' + id).then(response => {
        if (response.statusText === 'OK') {
            commit('TOPICS_ARTICLE', {
                ...response.data
            })
        }
    }).catch(error => {
        console.log(error)
    })
}

export const getComment = ({ commit, state: {route: { params: { id }}} }, { page, limit }) => {
    return request.get('/?action=comment&id=' + id + "&page=" + page + "&limit=" + limit).then(response => {
        if (response.statusText === 'OK') {
            commit('TOPICS_COMMENT', {
                ...response.data,
                page
            })
        }
    }).catch(error => {
        console.log(error)
    })
}
