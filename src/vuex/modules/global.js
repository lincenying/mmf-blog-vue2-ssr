import {
    GLOBAL_HIDEMSG,
    GLOBAL_LOADDING,
    GLOBAL_PROGRESS,
    GLOBAL_SHOWMSG,
    GLOBAL_LOGIN_FORM,
    GLOBAL_LOGIN_STATUS
} from '../mutation-types'

const state = {
    showLoginBox: false,
    sessionToken: '',
    loading: false,
    progress: 0,
    message: {
        type: '',
        content: '',
        title: ''
    }
}

const mutations = {
    [GLOBAL_LOADDING](state, status) {
        state.loading = status
    },
    [GLOBAL_PROGRESS](state, num) {
        state.progress = num
    },
    [GLOBAL_SHOWMSG](state, action) {
        state.message = {...action}
    },
    [GLOBAL_HIDEMSG](state) {
        state.message = {
            type: '',
            content: '',
            title: ''
        }
    },
    [GLOBAL_LOGIN_FORM](state, status) {
        state.showLoginBox = status
    },
    [GLOBAL_LOGIN_STATUS](state, sessionToken) {
        state.sessionToken = sessionToken
    }
}

export default {
    state,
    mutations
}
