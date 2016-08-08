

<template>

<div>
    <div v-html="article.content"></div>
</div>

</template>

<script>

import { mapGetters } from 'vuex'

const fetchInitialData = store => {
    return store.dispatch(`getArticle`)
}
export default {
    prefetch: fetchInitialData,
    computed: {
        ...mapGetters({
            article: 'getArticle'
        })
    },
    mounted() {
        fetchInitialData(this.$store)
    }
}

</script>
