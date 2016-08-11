import Vue from 'vue'
import App from './App.vue'
import store from './vuex'
import router from './router'
import ls from 'store2'
import { inBrowser } from './tools/command'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
    router,
    store,
    ...App
})
if (inBrowser) {
    router.beforeEach((route, redirect, next) => {
        var scrollTop = document.body.scrollTop
        if (store.state.route.path) {
            ls.set(store.state.route.path, scrollTop)
        }
        next()
    })
}

export { app, router, store }
