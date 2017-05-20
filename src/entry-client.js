import { app, store, router } from './app'

import "./assets/css/hljs/googlecode.css"
import "./assets/css/style.css"
import "./assets/less/frontend.less"
import "toastr/build/toastr.css"
import "nprogress/nprogress.css"

router.beforeEach((route, redirect, next) => {
    store.dispatch('global/gProgress', 0)
    next()
})

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    app.$mount('#app')
})

// only https
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    navigator.serviceWorker.register('/service-worker.js')
}
