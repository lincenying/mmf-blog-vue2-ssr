import api from '~api'

const state = {
    lists: {
        hasNext: false,
        hasPrev: false,
        path: '',
        page: 1,
        data: []
    },
    item: {
        data: {},
        path: ''
    }
}

const actions = {
    async ['backend/getUserList'] ({commit, rootState: {route: { path }}}, config) {
        const { data: { data, code} } = await api.get('backend/user/list', config)
        if (data && code === 200) {
            commit('backend/receiveUserList', {
                ...data,
                path,
                page: config.page
            })
        }
    },
    async ['backend/getUserItem'] ({commit, rootState: {route: { path, params: { id } }}}) {
        const { data: { data, code} } = await api.get('backend/user/item', { id })
        if (data && code === 200) {
            commit('backend/receiveUserItem', {
                data,
                path
            })
        }
    }
}

const mutations = {
    ['backend/receiveUserList'](state, {list, path, hasNext, hasPrev, page}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        page++
        state.lists = {
            data: list, hasNext, hasPrev, page, path
        }
    },
    ['backend/receiveUserItem'](state, payload) {
        state.item = payload
    },
    ['backend/updateUserItem'](state, payload) {
        state.item = {
            ...state.item.data,
            ...payload
        }
        const obj = state.lists.data.find(ii => ii._id === payload.id)
        if (obj) {
            obj.username = payload.username
            obj.email = payload.email
        }
    }
}

const getters = {
    ['backend/getUserList'] (state) {
        return state.lists
    },
    ['backend/getUserItem'] (state) {
        return state.item
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
