import {
    GLOBAL_PROGRESS,
    TOPICS_LIST,
    TOPICS_ARTICLE,
    TOPICS_COMMENT,
    TOPICS_COMMENT_INSERT,
    RECEIVE_ADMIN_TOPICS,
    RECEIVE_ADMIN_ARTICLE,
    DELETE_ARTICLE,
    RECOVER_ARTICLE
} from './mutation-types'

import api from '../api'
import toastr from 'toastr'
toastr.options.positionClass = 'toast-top-center'

export const gProgress = ({commit}, num) => {
    commit(GLOBAL_PROGRESS, num)
}

export const showMsg = ({commit}, config) => {
    let content, type
    if (typeof config === 'string') {
        content = config
        type = 'error'
    } else {
        content = config.content
        type = config.type
    }
    toastr[type](content)
}

export const hideMsg = () => {
    toastr.clear()
}

export const getTopics = ({ commit, state }, config) => {
    return api.getTopics(config).then(data => {
        commit(TOPICS_LIST, {
            ...data,
            page: config.page,
            path: state.route.path
        })
    }).catch(error => {
        console.log(error)
    })
}

export const getArticle = ({ commit, state: {route: { path, params: { id }}} }) => {
    return api.getArticle({id}).then(data => {
        commit(TOPICS_ARTICLE, {
            ...data,
            path
        })
    }).catch(error => {
        console.log(error)
    })
}

export const getComment = ({ commit, state: {route: { params: { id }}} }, { page, limit }) => {
    return api.getComment({id, page, limit}).then(data => {
        commit(TOPICS_COMMENT, {
            ...data,
            page
        })
    }).catch(error => {
        console.log(error)
    })
}

export const postComment = ({ commit, state: {route: { params: { id }}} }, { username, content }) => {
    return api.postComment({article_id: id, username, content}).then(data => {
        commit(TOPICS_COMMENT_INSERT, {
            ...data
        })
    }).catch(error => {
        console.log(error)
    })
}

export const getAdminTopics = ({commit, state: {route: { path, params: { page } }}}, config) => {
    return api.getTopics(config).then(data => {
        commit(RECEIVE_ADMIN_TOPICS, {
            ...data,
            page: config.page,
            path
        })
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
