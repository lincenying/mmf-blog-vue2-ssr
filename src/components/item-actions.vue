<template>
    <div class="actions-wrap">
        <a v-if="item.like_status" @click="like" href="javascript:;" class="action-item active"><i class="icon icon-action-voteup-active"></i><span class="text">{{ item.like }} 赞</span></a>
        <a v-else @click="unlike" href="javascript:;" class="action-item"><i class="icon icon-action-voteup"></i><span class="text">{{ item.like }} 赞</span></a>
        <a href="javascript:;" class="action-item"><i class="icon icon-action-comment"></i><span class="text">{{ item.comment_count }} 评论</span></a>
        <a href="javascript:;" class="action-item action-item-fav"><i class="icon icon-action-fav"></i><i class="icon icon-action-fav-active"></i><span class="text">{{ item.visit }} 浏览</span></a>
        <a href="javascript:;" class="action-item"><i class="icon icon-action-share"></i><span class="text">分享</span></a>
    </div>
</template>
<script lang="babel">
export default {
    name: 'item-actions',
    props: ['item'],
    methods: {
        like() {
            //
        },
        unlike() {
            //
        }
    }
}
</script>
