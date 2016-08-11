import request from 'axios'
import qs from 'qs'

request.defaults.baseURL = 'http://www.mmxiaowu.com/api'
request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const getTopics = ({ commit, state }, config) => {
    return request.post('/', qs.stringify(config)).then(response => {
        console.log(config)
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
    return request.get('/?id=' + id).then(response => {
        if (response.statusText === 'OK') {
            commit('TOPICS_ARTICLE', {
                ...response.data.data
            })
        }
    }).catch(error => {
        console.log(error)
    })
}
