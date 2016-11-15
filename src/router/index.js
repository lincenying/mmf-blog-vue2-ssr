import Vue from 'vue'
import Home from '../components/Home.vue'
import Article from '../components/Article.vue'
import VueRouter from 'vue-router'

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

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior,
    routes: [
        { path: '/', component: Home, meta: { needLogin: false } },
        { path: '/category/:id(\\d+)', component: Home, meta: { needLogin: false } },
        { path: '/search/:qs', component: Home, meta: { needLogin: false } },
        { path: '/article/:id', component: Article, meta: { needLogin: false } }
    ]
})

export default router
