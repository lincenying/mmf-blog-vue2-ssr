import Vue from 'vue'
import Home from '../components/Home.vue'
import Article from '../components/Article.vue'
import AdminList from '../components/AdminList.vue'
import VueRouter from 'vue-router'
import api from '../api'
import {inBrowser} from '../tools/command'

Vue.use(VueRouter)

const scrollBehavior = to => {
    const position = {}
    if (to.hash) {
        position.selector = to.hash
    }
    if (to.matched.some(mm => mm.meta.scrollToTop)) {
        position.x = 0
        position.y = 0
    }
    return position
}

const requireAuth = (route, redirect, next) => {
    const currentUser = api.getUser()
    if (!currentUser && inBrowser) {
        redirect({path: '/'})
    } else {
        next()
    }
}

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior,
    routes: [
        { path: '/', component: Home, meta: { needLogin: false } },
        { path: '/category/:id(\\d+)', component: Home, meta: { needLogin: false } },
        { path: '/search/:qs', component: Home, meta: { needLogin: false } },
        { path: '/article/:id', component: Article, meta: { needLogin: false } },
        { path: '/admin/list/:page(\\d+)', component: AdminList, meta: { needLogin: true }, beforeEnter: requireAuth }
    ]
})

export default router
