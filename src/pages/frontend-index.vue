<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <topics-item v-for="item in topics.list" :item="item"></topics-item>
                <div class="load-more-wrap"><a v-if="topics.hasNext" @click="loadMore()" href="javascript:;" class="load-more">更多<i class="icon icon-circle-loading"></i></a></div>
            </div>
        </div>
        <div class="main-right">
            <category></category>
            <trending></trending>
        </div>
    </div>
</template>
<script lang="babel">
import ls from 'store2'
import { mapGetters } from 'vuex'
import topicsItem from '../components/topics-item.vue'
import category from '../components/aside-category.vue'
import trending from '../components/aside-trending.vue'
import { ssp } from '../utils'
const fetchInitialData = async (store, config = { page: 1}) => {
    const {params: {id, qs}, path} = store.state.route
    const base = { ...config, markdown: 1, limit: 10, id, qs }
    await store.dispatch('frontend/getTopics', base)
    if (config.page === 1) ssp(path)
}
export default {
    name: 'index',
    prefetch: fetchInitialData,
    components: {
        topicsItem, category, trending
    },
    computed: {
        ...mapGetters({
            topics: 'frontend/getTopics'
        })
    },
    methods: {
        loadMore(page = this.topics.page + 1) {
            fetchInitialData(this.$store, {page})
        }
    },
    mounted() {
        if (this.topics.list.length <= 0 || this.$route.path !== this.topics.path) {
            fetchInitialData(this.$store, {page: 1})
        } else {
            ssp(this.$route.path)
            this.$store.dispatch('gProgress', 100)
        }
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store, {page: 1})
        }
    },
    beforeRouteLeave (to, from, next) {
        const scrollTop = document.body.scrollTop
        const path = this.$route.path
        if (scrollTop) ls.set(path, scrollTop)
        else ls.remove(path)
        next()
    }
}
</script>
