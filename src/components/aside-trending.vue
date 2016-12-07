<template>
    <div class="card card-trending">
        <h2 class="card-title">热门文章</h2>
        <div class="card-content">
            <div v-for="(item, index) in trending" class="trending-item">
                <span class="trending-rank-num">{{ index + 1 }}</span>
                <router-link :to="`/article/${item._id}`" class="trending-title">{{ item.title }}</router-link>
                <div class="trending-meta">
                    <div class="trending-meta-item"><i class="icon icon-action-voteup"></i>{{ item.like }}</div>
                    <div class="trending-meta-item"><i class="icon icon-action-comment"></i>{{ item.comment_count }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
import { mapGetters } from 'vuex'
const fetchInitialData = store => {
    store.dispatch('frontend/getTrending')
}
export default {
    name: 'aside-trending',
    prefetch: fetchInitialData,
    computed: {
        ...mapGetters({
            trending: 'frontend/getTrending'
        })
    },
    mounted() {
        if (this.trending.length <= 0) {
            fetchInitialData(this.$store)
        }
    }
}
</script>
