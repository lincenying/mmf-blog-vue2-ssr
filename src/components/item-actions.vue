<template>
    <div class="actions-wrap">
        <a v-if="item.like_status" @click="unlike" href="javascript:;" class="action-item active"><i class="icon icon-action-voteup-active"></i><span class="text">{{ item.like }} 赞</span></a>
        <a v-else @click="like" href="javascript:;" class="action-item"><i class="icon icon-action-voteup"></i><span class="text">{{ item.like }} 赞</span></a>
        <a href="javascript:;" class="action-item"><i class="icon icon-action-comment"></i><span class="text">{{ item.comment_count }} 评论</span></a>
        <a href="javascript:;" class="action-item action-item-fav"><i class="icon icon-action-fav"></i><i class="icon icon-action-fav-active"></i><span class="text">{{ item.visit }} 浏览</span></a>
        <a href="javascript:;" class="action-item"><i class="icon icon-action-share"></i><span class="text">分享</span></a>
    </div>
</template>
<script lang="babel">
import cookies from 'js-cookie'
import api from '~api'
export default {
    name: 'item-actions',
    props: ['item'],
    methods: {
        async like() {
            const username = cookies.get('user')
            if (!username) {
                this.$store.dispatch('showMsg', '请先登录!')
                this.$store.commit('global/showLoginModal', true)
                return
            }
            const { data: {code, message} } = await api.get('frontend/like', { id: this.item._id })
            if (code === 200) {
                this.$store.dispatch('showMsg', {
                    content: message,
                    type: 'success'
                })
                this.item.like++
                this.item.like_status = !this.item.like_status
            }
        },
        async unlike() {
            const username = cookies.get('user')
            if (!username) {
                this.$store.dispatch('showMsg', '请先登录!')
                this.$store.commit('global/showLoginModal', true)
                return
            }
            const { data: {code, message} } = await api.get('frontend/unlike', { id: this.item._id })
            if (code === 200) {
                this.$store.dispatch('showMsg', {
                    content: message,
                    type: 'success'
                })
                this.item.like--
                this.item.like_status = !this.item.like_status
            }
        }
    }
}
</script>
