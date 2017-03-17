import { app, store, router } from './app'

import "./assets/css/hljs/googlecode.css"
import "./assets/css/style.css"
import "toastr/build/toastr.css"
import "nprogress/nprogress.css"

router.beforeEach((route, redirect, next) => {
    store.dispatch('global/gProgress', 0)
    next()
})

store.replaceState(window.__INITIAL_STATE__)

router.onReady(() => {
    // actually mount to DOM
    app.$mount('#app')
})

// only https
//if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    //navigator.serviceWorker.register('/server/service-worker.js')
//}
