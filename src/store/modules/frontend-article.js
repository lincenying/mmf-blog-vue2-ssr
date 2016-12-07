import api from '~api'

const state = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
    item: {
        data: {},
        path: ''
    },
    trending: []
}

const actions = {
    async ['frontend/getArticleList']({commit, rootState: {route: { path }}}, config) {
        const { data: { data, code} } = await api.get('frontend/article/list', config)
        if (data && code === 200) {
            commit('frontend/receiveArticleList', {
                ...config,
                ...data,
                path
            })
        }
    },
    async ['frontend/getArticleItem']({ commit, rootState: {route: { path, params: { id }}} }) {
        const { data: { data, code} } = await api.get('frontend/article/item', { markdown: 1, id })
        if (data && code === 200) {
            commit('frontend/receiveArticleItem', {
                data,
                path
            })
        }
    },
    async ['frontend/getTrending']({ commit }) {
        const { data: { data, code} } = await api.get('frontend/trending')
        if (data && code === 200) {
            commit('frontend/receiveTrending', data)
        }
    }
}

const mutations = {
    ['frontend/receiveArticleList'](state, {list, hasNext, hasPrev, page, path}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list, hasNext, hasPrev, page, path
        }
    },
    ['frontend/receiveArticleItem'](state, {data, path}) {
        state.item = {
            data, path
        }
    },
    ['frontend/receiveTrending'](state, data) {
        state.trending = data.list
    }
}

const getters = {
    ['frontend/getArticleList'](state) {
        return state.lists
    },
    ['frontend/getArticleItem'](state) {
        return state.item
    },
    ['frontend/getTrending'](state) {
        return state.trending
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
