<template>
    <div class="card feed">
        <div class="feed-content"> <span class="feed-time" v-text="item.creat_date"></span><span class="feed-source">来自分类 <router-link :to="'/category/' + item.category" v-text="item.category_name" class="feed-minor-link"></router-link></span>
            <div class="feed-main-link-wrap"><router-link :to="'/article/' + item._id" v-text="item.title" class="feed-main-link"></router-link></div>
            <div class="feed-desc-wrap">
                <div class="feed-article-content" v-html="addTarget(item.html)"></div>
            </div>
        </div>
        <actions :item="item"></actions>
    </div>
</template>
<script lang="babel">
import actions from './item-actions.vue'
export default {
    name: 'index-item',
    props: ['item'],
    data () {
        return {
            showMore: false
        }
    },
    components: {
        actions
    },
    methods: {
        addTarget(content) {
            if (!content) return ''
            return content.replace(/<a(.*?)href=/g, '<a$1target="_blank" href=')
        }
    },
    serverCacheKey: props => {
        return `${ props.item._id }::${ props.item.creat_date }`
    }
}
</script>
