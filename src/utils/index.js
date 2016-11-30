import Vue from 'vue'
import ls from 'store2'

export const inBrowser = typeof window !== 'undefined'

export const ua = () => {
    var userAgentInfo = inBrowser ? navigator.userAgent : ''
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
    var flag = 'PC'
    for (var vv = 0; vv < Agents.length; vv++) {
        if (userAgentInfo.indexOf(Agents[vv]) > 0) {
            flag = Agents[vv]
            break
        }
    }
    return flag
}

export const ssp = path => {
    if (!inBrowser) return
    var scrollTop = ls.get(path) || 0
    Vue.nextTick().then(() => {
        window.scrollTo(0, scrollTop)
    })
}
