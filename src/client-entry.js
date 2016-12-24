import { app, store, router } from './app'

router.beforeEach((route, redirect, next) => {
    store.dispatch('global/gProgress', 0)
    next()
})

store.replaceState(window.__INITIAL_STATE__)

app.$mount('#app')

// only https
//if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    //navigator.serviceWorker.register('/server/service-worker.js')
//}
