function getTitle (vm) {
    const { title } = vm.$options
    if (title) {
        return typeof title === 'function' ? title.call(vm) : title
    }
}

const serverTitleMixin = {
    created () {
        const meta = getTitle(this)
        if (meta) {
            this.$ssrContext.title = meta.title || meta
            this.$ssrContext.description = meta.title || meta
        }
    }
}

const clientTitleMixin = {
    mounted () {
        const meta = getTitle(this)
        if (meta) {
            document.title = meta.title || meta
        }
    }
}

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin
