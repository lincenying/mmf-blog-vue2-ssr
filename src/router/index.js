import Vue from 'vue'
import Home from '../components/Home.vue'
import Article from '../components/Article.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', component: Home },
        { path: '/category/:id(\\d+)', component: Home },
        { path: '/article/:id(\\d+)', component: Article }
    ]
})

export default router
