import api from '../../api'
import {
    RECEIVE_TOPICS, RECEIVE_ARTICLE, RECEIVE_COMMENT, POST_COMMENT
} from '../mutation-types'

const state = {
    topics: {
        list: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
    article: {
        data: {},
        prev: {},
        next: {},
        path: ''
    },
    comment: {
        list: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
    category: []
}

const actions = {
    async ['frontend/getTopics']({commit, rootState: {route: { path }}}, config) {
        const { data: { data, code} } = await api.get('frontend/topics', config)
        if (data && code === 200) {
            commit(RECEIVE_TOPICS, {
                ...config,
                ...data,
                path
            })
        }
    },
    async ['frontend/getArticle']({ commit, rootState: {route: { path, params: { id }}} }) {
        const { data: { data, prev, next, code} } = await api.get('frontend/article', { markdown: 1, id })
        if (data && code === 200) {
            commit(RECEIVE_ARTICLE, {
                data,
                prev,
                next,
                path
            })
        }
    },
    async ['frontend/getComment']({ commit, rootState: {route: { path, params: { id }}} }, { page, limit }) {
        const { data: { data, code} } = await api.get('frontend/comment/list', { page, id, limit })
        if (data && code === 200) {
            commit(RECEIVE_COMMENT, {
                ...data,
                page,
                path
            })
        }
    },
    async ['frontend/postComment']({ commit, rootState: {route: { path, params: { id }}} }, config) {
        const { data: { data, code} } = await api.post('frontend/comment/post', config)
        if (data && code === 200) {
            commit(POST_COMMENT, data)
            return data
        }
    }
}

const mutations = {
    [RECEIVE_TOPICS](state, {list, hasNext, hasPrev, page, path}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.topics.list.concat(list)
        }
        state.topics = {
            list, hasNext, hasPrev, page, path
        }
    },
    [RECEIVE_ARTICLE](state, {data, prev, next, path}) {
        state.article = {
            data, prev, next, path
        }
    },
    [RECEIVE_COMMENT](state, {hasNext, list, path, page}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.comment.list.concat(list)
        }
        state.comment = {
            list, hasNext, path, page
        }
    },
    [POST_COMMENT](state, data) {
        state.comment.list = [data].concat(state.comment.list)
    }
}

const getters = {
    ['frontend/getTopics'](state) {
        return state.topics
    },
    ['frontend/getArticle'](state) {
        return state.article
    },
    ['frontend/getComment'](state) {
        return state.comment
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
