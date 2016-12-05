import api from '../../api'
import {
    DELETE_ARTICLE,
    RECEIVE_ADMIN_TOPICS,
    RECOVER_ARTICLE,
    UPDATE_ADMIN_ARTICLE,
    RECEIVE_ADMIN_ARTICLE
} from '../mutation-types'

const state = {
    topics: {
        list: [],
        path: '',
        hasNext: 0,
        hasPrev: 0
    },
    article: {}
}

const actions = {
    async ['admin/getTopics'] ({commit, rootState: {route: { path, params: { page } }}}, config) {
        config.page = page
        const { data: { data, code} } = await api.get('admin/topics', config)
        if (data && code === 200) {
            commit(RECEIVE_ADMIN_TOPICS, {
                ...data,
                path
            })
        }
    },
    async ['admin/getArticle'] ({ rootState: {route: { params: { id }}} }) {
        const { data: { data, code} } = await api.get('admin/article', { id })
        if (data && code === 200) {
            return data
        }
    },
    async ['admin/deleteArticle'] ({commit}, config) {
        const { data: { code} } = await api.get('admin/article/delete', config)
        if (code === 200) {
            commit(DELETE_ARTICLE, config.id)
        }
    },
    async ['admin/recoverArticle'] ({commit}, config) {
        const { data: { code} } = await api.get('admin/article/recover', config)
        if (code === 200) {
            commit(RECOVER_ARTICLE, config.id)
        }
    }
}

const mutations = {
    [RECEIVE_ADMIN_TOPICS](state, {list, path, hasNext, hasPrev}) {
        state.topics = {
            list,  path, hasNext, hasPrev
        }
    },
    [RECEIVE_ADMIN_ARTICLE](state, { data }) {
        state.article = data
    },
    [UPDATE_ADMIN_ARTICLE](state, data) {
        const obj = state.topics.list.find(ii => ii._id === data._id)
        for (const jj in obj) {
            if (obj.hasOwnProperty(jj) && data[jj]) {
                obj[jj] = data[jj]
            }
        }
    },
    [DELETE_ARTICLE](state, id) {
        const obj = state.topics.list.find(ii => ii._id === id)
        obj.is_delete = 1
    },
    [RECOVER_ARTICLE](state, id) {
        const obj = state.topics.list.find(ii => ii._id === id)
        obj.is_delete = 0
    }
}

const getters = {
    ['admin/getTopics'] (state) {
        return state.topics
    },
    ['admin/getArticle'] (state) {
        return state.article
    },
    ['admin/getCategory'] (state) {
        return state.category
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
