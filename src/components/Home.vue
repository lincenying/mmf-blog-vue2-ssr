<template>
    <div class="g-mn">
        <div class="posts">
            <index-post v-for="item in topics.list" :ispc="isPC" :item="item"></index-post>
        </div>
        <div class="box m-page box-do">
            <div class="w-icon w-icon-2"></div>
            <div class="w-icon w-icon-3"></div>
            <a v-if="topics.hasNext" @click="loadMore()" href="javascript:;">加载更多</a>
            <span v-else>好厉害, 竟然翻到最后一页了...</span>
        </div>
    </div>
</template>
<script lang="babel">
    import { mapGetters } from 'vuex'
    import { ua, ssp } from '../tools/command'
    import indexPost from './IndexPost.vue'
    const fetchInitialData = (store, config = { page: 1}) => {
        const id = store.state.route.params.id || ""
        const qs = store.state.route.params.qs || ""
        const base = {
            ...config,
            action: 'getArticleList',
            markdown: 1,
            limit: 10,
            id,
            qs
        }
        return store.dispatch('getTopics', base)
    }
    export default {
        prefetch: fetchInitialData,
        components: {
            indexPost
        },
        computed: {
            ...mapGetters({
                topics: 'getTopics'
            }),
            isPC() {
                return ua() === "PC"
            },
            nextPage() {
                return this.topics.curPage + 1
            }
        },
        methods: {
            loadMore(page = this.nextPage) {
                fetchInitialData(this.$store, {
                    page
                })
            }
        },
        beforeMount() {
            if (this.topics.path !== this.$route.path)
                this.loadMore(1)
        },
        mounted() {
            ssp(this.$route.path)
        },
        watch: {
            '$route'() {
                this.loadMore(1)
            }
        }
    }
</script>
