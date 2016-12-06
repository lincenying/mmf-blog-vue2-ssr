import Vue from 'vue'
import Vuex from 'vuex'
import backendAdmin from './modules/backend-admin'
import frontend from './modules/frontend'
import admin from './modules/admin'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        backendAdmin,
        frontend,
        admin,
        global
    }
})
