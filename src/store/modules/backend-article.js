import api from '~api'

const state = {
    lists: {
        data: [],
        path: '',
        hasNext: 0,
        hasPrev: 0,
        page: 1
    }
}

const actions = {
    async ['backend/getArticleList'] ({commit, rootState: {route: { path, params: { page } }}}, config) {
        const { data: { data, code} } = await api.get('backend/article/list', config)
        if (data && code === 200) {
            commit('backend/receiveArticleList', {
                ...data,
                path,
                page: config.page
            })
        }
    },
    async ['backend/getArticleItem'] ({ rootState: {route: { params: { id }}} }) {
        const { data: { data, code} } = await api.get('backend/article/item', { id })
        if (data && code === 200) {
            return data
        }
    },
    async ['backend/deleteArticle'] ({commit}, config) {
        const { data: { code} } = await api.get('backend/article/delete', config)
        if (code === 200) {
            commit('backend/deleteArticle', config.id)
        }
    },
    async ['backend/recoverArticle'] ({commit}, config) {
        const { data: { code} } = await api.get('backend/article/recover', config)
        if (code === 200) {
            commit('backend/recoverArticle', config.id)
        }
    }
}

const mutations = {
    ['backend/receiveArticleList'](state, {list, path, hasNext, hasPrev, page}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list,  path, hasNext, hasPrev, page
        }
    },
    ['backend/insertArticleItem'](state, payload) {
        if (state.lists.path) {
            state.lists.data = [payload].concat(state.lists.data)
        }
    },
    ['backend/updateArticleItem'](state, data) {
        const obj = state.lists.data.find(ii => ii._id === data.id)
        for (const jj in obj) {
            if (obj.hasOwnProperty(jj) && data[jj]) {
                obj[jj] = data[jj]
            }
        }
    },
    ['backend/deleteArticle'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
    },
    ['backend/recoverArticle'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
    }
}

const getters = {
    ['backend/getArticleList'] (state) {
        return state.lists
    },
    ['backend/getArticleItem'] (state) {
        return state.item
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
