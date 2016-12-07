import Vue from 'vue'
import Vuex from 'vuex'
import backendAdmin from './modules/backend-admin'
import backendArticle from './modules/backend-article'
import backendCategory from './modules/backend-category'
import backendUser from './modules/backend-user'
import frontendArticle from './modules/frontend-article'
import global from './modules/global'
import globalComment from './modules/global-comment'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        backendAdmin,
        backendArticle,
        backendCategory,
        backendUser,
        frontendArticle,
        global,
        globalComment
    }
})
