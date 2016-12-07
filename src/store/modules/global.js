import toastr from 'toastr'
import {inBrowser} from '~utils'

toastr.options.positionClass = 'toast-top-center'

const state = {
    loading: false,
    progress: 0,
    showLoginModal: false,
    showRegisterModal: false
}

const actions = {
    ['gProgress']({commit}, payload) {
        commit('global/progress', payload)
    },
    ['showMsg']({commit}, config) {
        let content, type
        if (typeof config === 'string') {
            content = config
            type = 'error'
        } else {
            content = config.content
            type = config.type
        }
        if (inBrowser) toastr[type](content)
    },
    ['hideMsg']() {
        toastr.clear()
    }
}

const mutations = {
    ['global/progress'](state, payload) {
        state.progress = payload
    },
    ['global/showLoginModal'](state, payload) {
        state.showLoginModal = payload
    },
    ['global/showRegisterModal'](state, payload) {
        state.showRegisterModal = payload
    }
}

const getters = {
    ['global/getGlobal'](state) {
        return state
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}
