import api from '~api'

const state = {
    lists: [],
    item: {}
}

const actions = {
    async ['backend/getCategoryList']({ commit }, config) {
        const { data: { data, code} } = await api.get('backend/category/list', config)
        if (data && code === 200) {
            commit('frontend/receiveCategoryList', data.list)
        }
    },
    async ['backend/getCategoryItem'] ({commit, rootState: {route: { params: { id } }}}) {
        const { data: { data, code} } = await api.get('backend/category/item', { id })
        if (data && code === 200) {
            commit('backend/receiveCategoryItem', data)
        }
    }
}

const mutations = {
    ['frontend/receiveCategoryList'](state, payload) {
        state.lists = payload
    },
    ['backend/receiveCategoryItem'](state, payload) {
        state.item = payload
    },
    ['backend/insertCategoryItem'](state, payload) {
        state.lists = [payload].concat(state.lists)
    },
    ['backend/updateCategoryItem'](state, payload) {
        state.item = {
            ...state.item,
            ...payload
        }
        const obj = state.lists.find(ii => ii._id === payload._id)
        if (obj) {
            obj.cate_name = payload.cate_name
            obj.cate_order = payload.cate_order
        }
    }
}

const getters = {
    ['backend/getCategoryList'] (state) {
        return state.lists
    },
    ['backend/getCategoryItem'] (state) {
        return state.item
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
