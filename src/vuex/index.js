import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import topic from './modules/topic'
import admin from './modules/admin'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        topic,
        admin
    }
})
