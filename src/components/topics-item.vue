<template>
    <div class="card feed">
        <div class="feed-content"> <span class="feed-time" v-text="item.creat_date"></span><span class="feed-source">来自分类 <a href="" class="feed-minor-link">技术</a></span>
            <div class="feed-main-link-wrap"><router-link :to="'/article/' + item._id" v-text="item.title" class="feed-main-link"></router-link></div>
            <div class="feed-desc-wrap">
                <div class="feed-article-content" v-html="addTarget(item.html)"></div>
            </div>
        </div>
        <div class="actions-wrap">
            <a href="" class="action-item action-item-voteup"><i class="icon icon-action-voteup"></i><i class="icon icon-action-voteup-active"></i><span class="text">92 赞</span></a>
            <a href="" class="action-item"><i class="icon icon-action-comment"></i><span class="text">36 评论</span></a>
            <a href="" class="action-item action-item-fav"><i class="icon icon-action-fav"></i><i class="icon icon-action-fav-active"></i><span class="text">28 浏览</span></a>
            <a href="" class="action-item"><i class="icon icon-action-share"></i><span class="text">分享</span></a>
        </div>
    </div>
</template>
<script lang="babel">
    export default {
        name: 'index-item',
        props: ['item', 'ispc'],
        data () {
            return {
                showMore: false
            }
        },
        methods: {
            open(e) {
                this.showMore = !this.showMore
                var $mPost = $(e.target).parents(".m-post")
                var offset = $mPost.offset()
                $("body").animate({
                    scrollTop: offset.top
                }, 500 )
            },
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
