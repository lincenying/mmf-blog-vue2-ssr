

<template>

<div>
    <div v-for="topic in topics.list">
        <p><router-link :to="'/article/' + topic.id">{{topic.title}}</router-link></p>
    </div>
    <a v-if="topics.hasNext" @click="loadMore()" href="javascript:;">下一页</a>
</div>

</template>

<script>

import { mapGetters } from 'vuex'

const fetchInitialData = (store, page = 1) => {
    return store.dispatch(`getTopics`, page)
}
export default {
    prefetch: fetchInitialData,
    computed: {
        ...mapGetters({
            topics: 'getTopics'
        })
    },
    mounted() {
        if (this.$route.fullPath !== this.topics.path)
            fetchInitialData(this.$store)
    },
    methods: {
        loadMore(page = this.topics.curPage + 1) {
            fetchInitialData(this.$store, page)
        }
    }
}

</script>
