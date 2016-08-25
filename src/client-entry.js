import ls from 'store2'
import { app, store, router } from './app'

router.beforeEach((route, redirect, next) => {
    store.dispatch('gProgress', 0)
    var scrollTop = document.body.scrollTop
    if (store.state.route.path) {
        ls.set(store.state.route.path, scrollTop)
    }
    next()
})

store.replaceState(window.__INITIAL_STATE__)

app.$mount('#app')
