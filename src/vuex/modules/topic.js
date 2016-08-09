import {
    TOPICS_LIST, TOPICS_ARTICLE
} from '../mutation-types'

const state = {
    topics: {
        curPage: 1,
        list: [],
        hasNext: 1,
        path: ''
    },
    article: {
        data: {}
    }
}

const mutations = {
    [TOPICS_LIST]: (state, {data, path, page}) => {
        if (page === 1) {
            state.topics.list = [].concat(data)
        } else {
            state.topics.list = state.topics.list.concat(data)
        }
        state.topics.curPage = page
        state.topics.path = path
    },
    [TOPICS_ARTICLE]:  (state, { data }) => {
        state.article.data = data
    }
}
export default {
    state,
    mutations
}
