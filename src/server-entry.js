import { app, router, store } from './app'

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
    // 设置路由
    router.push(context.url)
    // 查找路由匹配的组件, 调用 prefetch 钩子
    const ss = isDev && Date.now()
    return Promise.all(router.getMatchedComponents().map(component => {
        if (component.prefetch) {
            return component.prefetch(store)
        }
    })).then(() => {
        if (isDev)
            console.log(`data pre-fetch: ${Date.now() - ss}ms`)
        // 设置初始 store
        context.initialState = store.state
        return app
    })
}
