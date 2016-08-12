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
        { path: '/', component: Home },
        { path: '/category/:id(\\d+)', component: Home },
        { path: '/search/:qs', component: Home },
        { path: '/article/:id(\\d+)', component: Article, meta: { scrollToTop: true } }
    ]
})

export default router
