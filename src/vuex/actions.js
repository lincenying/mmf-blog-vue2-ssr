import {
    TOPICS_LIST, TOPICS_ARTICLE, TOPICS_COMMENT, RECEIVE_ADMIN_TOPICS, RECEIVE_ADMIN_ARTICLE, DELETE_ARTICLE, RECOVER_ARTICLE
} from './mutation-types'

import * as api from '../api'
import toastr from 'toastr'

export const showMsg = ({commit}, content, type = 'error') => {
    toastr[type](content)
}

export const hideMsg = () => {
    toastr.clear()
}

export const getTopics = ({ commit, state }, config) => {
    return api.getTopics(config).then(response => {
        if (response.statusText === 'OK') {
            commit(TOPICS_LIST, {
                ...response.data,
                page: config.page,
                path: state.route.path
            })
        }
    }).catch(error => {
        console.log(error)
    })
}

export const getArticle = ({ commit, state: {route: { path, params: { id }}} }) => {
    return api.getArticle(id).then(response => {
        if (response.statusText === 'OK') {
            commit(TOPICS_ARTICLE, {
                ...response.data,
                path
            })
        }
    }).catch(error => {
        console.log(error)
    })
}

export const getComment = ({ commit, state: {route: { params: { id }}} }, { page, limit }) => {
    return api.getComment({id, page, limit}).then(response => {
        if (response.statusText === 'OK') {
            commit(TOPICS_COMMENT, {
                ...response.data,
                page
            })
        }
    }).catch(error => {
        console.log(error)
    })
}

export const getAdminTopics = ({commit, state: {route: { path, params: { page } }}}, config) => {
    return api.getAdminTopics(config).then(response => {
        console.log(response.data)
        if (response.statusText === 'OK') {
            commit(RECEIVE_ADMIN_TOPICS, {
                ...response.data,
                page: config.page,
                path
            })
        }
    }).catch(error => {
        console.log(error)
    })
}
export const getAdminArticle = ({commit, state: {route: { path, params: { id }}} }) => {
    api.getAdminArticle(id).then(response => {
        if (response.statusText === 'OK') {
            commit(RECEIVE_ADMIN_ARTICLE, {
                ...response.data,
                path
            })
        }
    }).catch(error => {
        console.log(error)
    })
}

export const deleteArticle = ({commit}, config) => {
    api.deleteArticle(config).then(() => {
        commit(DELETE_ARTICLE, config.id)
    })
}

export const recoverArticle = ({commit}, config) => {
    api.recoverArticle(config).then(() => {
        commit(RECOVER_ARTICLE, config.id)
    })
}
