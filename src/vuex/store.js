import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const defaultState = {
    topics: {
        curPage: 1,
        list: [],
        hasNext: 1,
        path: ''
    },
    article: {
        data: {}
    },
    count: 0
}

const inBrowser = typeof window !== 'undefined'

// if in browser, use pre-fetched state injected by SSR
// eslint-disable-next-line
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

const mutations = {
    TOPICS_LIST: (state, json) => {
        if (json.page === 1) {
            state.topics.list = [].concat(json.data.data)
        } else {
            state.topics.list = state.topics.list.concat(json.data.data)
        }
        state.topics.curPage = json.page
        state.topics.path = json.path
    },
    TOPICS_ARTICLE:  (state, topics) => {
        state.article.data = topics.data
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
