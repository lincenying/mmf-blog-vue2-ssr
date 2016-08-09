import request from 'axios'

request.defaults.baseURL = 'https://cnodejs.org/api/v1'

export const getTopics = ({ commit, state }, page) => {
    return request.get('/topics?page=' + page + '&limit=10').then(response => {
        if (response.statusText === 'OK') {
            commit('TOPICS_LIST', {
                ...response.data,
                page,
                path: state.route.fullPath
            })
        }
    }).catch(error => {
        console.log(error)
    })
}

export const getArticle = ({ commit, state: {route: { params: { id }}} }) => {
    return request.get('/topic/' + id).then(response => {
        if (response.statusText === 'OK') {
            commit('TOPICS_ARTICLE', {
                ...response.data
            })
        }
    }).catch(error => {
        console.log(error)
    })
}
