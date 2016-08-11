<template>
    <div class="g-mn">
    <template v-if="article">
        <div class="posts">
            <div class="m-post box article">
                <a href="javascript:;" class="w-icon w-icon-1">&nbsp;</a>
                <a href="javascript:;" class="w-icon2">&nbsp;</a>
                <div class="info">
                    <a href="javascript:;" v-text="article.creat_date"></a>
                    <a href="javascript:;">浏览: {{ article.visit }}</a>
                    <a href="javascript:;" class="comnum" v-text="article.comment_count"></a>
                </div>
                <div class="cont cont-1">
                    <div class="text">
                        <h2><a v-link="{ name: 'article', params: { id: article._id }}" v-text="article.title"></a></h2>
                        <div class="markdown-body" v-html="article.content | marked"></div>
                    </div>
                </div>
                <div class="info info-1"></div>
            </div>
        </div>
        <div class="box m-page box-do">
            <div class="w-icon w-icon-2"></div>
            <div class="w-icon w-icon-3"></div>
            <a v-if="prev.prev_id" v-link="{ name: 'article', params: { id: prev.prev_id }, force: true}" id="__prev_permalink__" class="prev">上一篇</a>
            <span v-else class="prev">上一篇</span>
            <a v-if="next.next_id" v-link="{ name: 'article', params: { id: next.next_id }, force: true}" id="__next_permalink__" class="next">下一篇</a>
            <span v-else class="next">下一篇</span>
        </div>
    </template>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
const fetchInitialData = store => {
    return store.dispatch(`getArticle`)
}
export default {
    prefetch: fetchInitialData,
    computed: {
        ...mapGetters({
            topics: 'getArticle'
        })
    },
    data () {
        return {
            article: null,
            next: null,
            prev: null,
            comments: {
                list: [],
                hasNext: 0,
                page: 1
            }
        }
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store)
        }
    }
}
</script>
