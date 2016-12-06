<template>
    <div class="card card-topics">
        <template v-for="item in category">
            <router-link :to="`/category/${item._id}`" class="topic-item clearfix"><span class="avatar-link"><img src="/static/images/topic-1.png" class="avatar-image"></span>
                <h3 class="topic-title">{{ item.cate_name }}</h3>
                <p class="topic-meta">{{ item.cate_num }} 篇文章</p><i class="icon icon-arrow-right"></i>
            </router-link>
        </template>
    </div>
</template>
<script lang="babel">
import { mapGetters } from 'vuex'
const fetchInitialData = store => {
    store.dispatch('frontend/getCategoryList')
}
export default {
    name: 'aside-category',
    prefetch: fetchInitialData,
    computed: {
        ...mapGetters({
            category: 'frontend/getCategoryList'
        })
    },
    mounted() {
        if (this.category.length <= 0) {
            fetchInitialData(this.$store)
        }
    }
}
</script>
