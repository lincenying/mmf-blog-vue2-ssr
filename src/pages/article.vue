<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <div class="card card-question-head">
                <div class="question-content"><a href="" class="topic-link-item">乐活</a>
                    <h2 class="question-title"><a href="" class="question-title-link">有哪些并不适合亚洲女性穿的冬季大衣？</a></h2>
                </div>
            </div>
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="article-content">
                        <p>他们一个个拖着步子走上前来，都是些困倦不堪的男人。他的那些20卢比（约合人民币2元）一张的被子堆在一起，三轮车夫们过来揭下一张，把身体弯成一个别扭的角度，躺在四英尺高的车座上。一些打零工的蜷缩在阴冷的人行道上，有时候要几个男人挤在一起取暖。</p><img src="stock-images/1.png" alt="">
                        <p>睡眠的私有化跟这座城市的一个规律是相符的：经过几十年不加管控的增长，市政府无力提供医疗、水、交通和安全等服务，从而成就私营产业的崛起，它们的效率够高，能够满足那些出得起钱的人的需求。</p>
                        <p>睡眠的私有化跟这座城市的一个规律是相符的：经过几十年不加管控的增长，市政府无力提供医疗、水、交通和安全等服务，从而成就私营产业的崛起，它们的效率够高，能够满足那些出得起钱的人的需求。</p>
                        <p>睡眠的私有化跟这座城市的一个规律是相符的：经过几十年不加管控的增长，市政府无力提供医疗、水、交通和安全等服务，从而成就私营产业的崛起，它们的效率够高，能够满足那些出得起钱的人的需求。</p>
                        <p>睡眠的私有化跟这座城市的一个规律是相符的：经过几十年不加管控的增长，市政府无力提供医疗、水、交通和安全等服务，从而成就私营产业的崛起，它们的效率够高，能够满足那些出得起钱的人的需求。</p>
                    </div>
                </div>
                <div class="actions-wrap">
                    <a href="" class="action-item"><i class="icon icon-action-voteup"></i><span class="text">92 赞</span></a>
                    <a href="" class="action-item"><i class="icon icon-action-comment"></i><span class="text">36 评论</span></a>
                    <a href="" class="action-item"><i class="icon icon-action-fav"></i><span class="text">28 浏览</span></a>
                    <a href="" class="action-item"><i class="icon icon-action-share"></i><span class="text">分享</span></a>
                </div>
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
import articleItem from '../components/article-item.vue'
import comment from '../components/comment.vue'
import category from '../components/category.vue'
import trending from '../components/trending.vue'
const fetchInitialData = async store => {
    await store.dispatch(`frontend/getArticle`)
    await store.dispatch(`frontend/getComment`, { page: 1, limit: 5})
}
export default {
    prefetch: fetchInitialData,
    computed: {
        ...mapGetters({
            article: 'frontend/getArticle'
        })
    },
    components: {
        articleItem,
        comment,
        category,
        trending
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
    }
}
</script>
