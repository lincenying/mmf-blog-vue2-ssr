<template>
    <div v-show="scrollTop > 500" class="back-top">
        <a @click="handleBackTop" href="javascript:;"></a>
    </div>
</template>

<script lang="babel">
export default {
    data() {
        return {
            scrollTop: 0
        }
    },
    methods: {
        scrolling() {
            if (window.scrollTime) window.clearTimeout(window.scrollTime)
            window.scrollTime = window.setTimeout(() => {
                this.scrollTop = document.body.scrollTop
            }, 100)
        },
        handleBackTop() {
            var top = this.scrollTop
            var timer = setInterval(() => {
                top -= Math.abs(top * 0.1)
                if (top <= 1) {
                    top = 0
                    clearInterval(timer)
                }
                document.body.scrollTop = top
            }, 20)
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrolling)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrolling)
    },
}
</script>
