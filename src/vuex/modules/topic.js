import {
    TOPICS_LIST, TOPICS_ARTICLE, TOPICS_COMMENT, TOPICS_COMMENT_INSERT
} from '../mutation-types'

const state = {
    topics: {
        curPage: 1,
        list: [],
        hasNext: 0,
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
        hasNext: 0
    }
}

const mutations = {
    [TOPICS_LIST]: (state, {list, hasNext, path, page}) => {
        if (page === 1) {
            state.topics.list = [].concat(list)
        } else {
            state.topics.list = state.topics.list.concat(list)
        }
        state.topics.hasNext = hasNext
        state.topics.curPage = page
        state.topics.path = path
    },
    [TOPICS_ARTICLE]:  (state, { data, next, prev, path }) => {
        state.article.data = data
        state.article.next = next
        state.article.prev = prev
        state.article.path = path
    },
    [TOPICS_COMMENT]:  (state, { list, hasNext, page }) => {
        if (page === 1) {
            state.comment.list = [].concat(list)
        } else {
            state.comment.list = state.comment.list.concat(list)
        }
        state.comment.hasNext = hasNext
        state.comment.curPage = page
    },
    [TOPICS_COMMENT_INSERT]: (state, data) => {
        state.comment.list.unshift(data)
    }
}
export default {
    state,
    mutations
}
