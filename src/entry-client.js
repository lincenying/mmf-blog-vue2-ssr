/**
 * @file client entry
 * @author lincenying(lincenying@qq.com)
 */

import './polyfill'
import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

import FastClick from 'fastclick'
import api from '~api'
import { createApp } from './app'
import ProgressBar from '@/components/ProgressBar.vue'

import './assets/css/hljs/googlecode.css'
import './assets/less/style.less'
import 'toastr/build/toastr.css'

// 如果你需要前端错误信息监控, 可以到 https://sentry.io/ 注册个账号, 然后将 PUBLIC_DSN 替换下方的
// 如果不需要可以直接删除
Raven.config('https://cefc965cf10748aea0cc56659c2fe9ea@sentry.io/256376', {
    includePaths: [/https?:\/\/www\.mmxiaowu\.com/]
    // includePaths: [/https?:\/\/www\.mmxiaowu\.com/, /http:\/\/localhost:8080/]
})
    .addPlugin(RavenVue, Vue)
    .install()

// 全局的进度条，在组件中可通过 $loading 访问
const loading = (Vue.prototype.$loading = new Vue(ProgressBar).$mount())
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
    store.$api = store.state.$api = api
}

document.body.appendChild(loading.$el)
FastClick.attach(document.body)

Vue.mixin({
    // 当复用的路由组件参数发生变化时，例如/detail/1 => /detail/2
    /*
    beforeRouteUpdate(to, from, next) {
        // asyncData方法中包含异步数据请求
        const asyncData = this.$options.asyncData
        if (asyncData) {
            loading.start()
            asyncData
                .call(this, {
                    store: this.$store,
                    route: to,
                    isServer: false,
                    isClient: true,
                })
                .then(() => {
                    loading.finish()
                    next()
                })
                .catch(next)
        } else {
            next()
        }
    },
    */

    // 页面渲染后, 跳转到记录的滚动条位置
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.$nextTick().then(() => {
                const scrollTop = vm.$store.state.appShell.historyPageScrollTop[to.fullPath] || 0
                window.scrollTo(0, scrollTop)
            })
        })
    },
    // 路由切换时，保存页面滚动位置
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch('appShell/saveScrollTop', {
            path: from.fullPath,
            scrollTop: Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        })
        next()
    }
})

// 此时异步组件已经加载完成
router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // [a, b]
    // [a, b, c, d]
    // => [c, d]
    let diffed = false
    const activated = matched.filter((c, i) => diffed || (diffed = prevMatched[i] !== c))

    if (!activated.length) {
        return next()
    }

    loading.start()
    Promise.all(
        activated.map(c => {
            /**
             * 两种情况下执行asyncData:
             * 1. 非keep-alive组件每次都需要执行
             * 2. keep-alive组件首次执行，执行后添加标志
             */
            if (c.asyncData && (!c.asyncDataFetched || to.meta.notKeepAlive)) {
                return c
                    .asyncData({
                        store,
                        route: to,
                        isServer: false,
                        isClient: true
                    })
                    .then(() => {
                        c.asyncDataFetched = true
                    })
            }
        })
    )
        .then(() => {
            loading.finish()
            next()
        })
        .catch(next)
})

router.onReady(() => app.$mount('#app'))
