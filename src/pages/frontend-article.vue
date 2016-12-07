<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <div class="card card-question-head">
                <div class="question-content">
                    <router-link :to="'/category/' + article.data.category" v-text="article.data.category_name" class="topic-link-item"></router-link>
                    <h2 class="question-title"><router-link :to="'/article/' + article.data._id" v-text="article.data.title" class="question-title-link"></router-link></h2>
                </div>
            </div>
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="article-content markdown-body" v-html="addTarget(article.data.html)"></div>
                </div>
                <actions :item="article.data"></actions>
            </div>
            <comment></comment>
        </div>
        <div class="main-right">
            <category></category>
            <trending></trending>
        </div>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
import actions from '../components/item-actions.vue'
import category from '../components/aside-category.vue'
import trending from '../components/aside-trending.vue'
import comment from '../components/frontend-comment.vue'
const fetchInitialData = async store => {
    await store.dispatch(`frontend/getArticleItem`)
    await store.dispatch(`global/getCommentList`, { page: 1, limit: 5})
}
export default {
    name: 'frontend-article',
    prefetch: fetchInitialData,
    computed: {
        ...mapGetters({
            article: 'frontend/getArticleItem'
        })
    },
    components: {
        actions,
        comment,
        category,
        trending
    },
    methods: {
        addTarget(content) {
            if (!content) return ''
            return content.replace(/<a(.*?)href=/g, '<a$1target="_blank" href=')
        }
    },
    mounted() {
        if (this.$route.path !== this.article.path) {
            fetchInitialData(this.$store)
        } else {
            this.$store.dispatch('gProgress', 100)
        }
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store)
        }
    },
    metaInfo () {
        return {
            title: this.article.data.title + ' - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: this.article.data.title + ' - M.M.F 小屋' }]
        }
    }
}
</script>
