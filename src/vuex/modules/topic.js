import {
    TOPICS_LIST, TOPICS_ARTICLE, TOPICS_COMMENT
} from '../mutation-types'

const state = {
    topics: {
        curPage: 1,
        list: [],
        hasNext: 1,
        path: ''
    },
    article: {
        data: {},
        next: {},
        prev: {},
        path: ''
    },
    comment: {
        curPage: 1,
        list: [],
        hasNext: 1
    }
}

const mutations = {
    [TOPICS_LIST]: (state, {data, path, page}) => {
        if (page === 1) {
            state.topics.list = [].concat(data.list)
        } else {
            state.topics.list = state.topics.list.concat(data.list)
        }
        state.topics.hasNext = data.hasNext
        state.topics.curPage = page
        state.topics.path = path
    },
    [TOPICS_ARTICLE]:  (state, { data, next, prev, path }) => {
        state.article.data = data
        state.article.next = next
        state.article.prev = prev
        state.article.path = path
    },
    [TOPICS_COMMENT]:  (state, { data, page }) => {
        if (page === 1) {
            state.comment.list = [].concat(data.list)
        } else {
            state.comment.list = state.comment.list.concat(data.list)
        }
        state.comment.hasNext = data.hasNext
        state.comment.curPage = page
    }
}
export default {
    state,
    mutations
}
