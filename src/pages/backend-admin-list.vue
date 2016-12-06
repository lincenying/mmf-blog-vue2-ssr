<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <div class="settings-main card">
                    <div class="settings-main-content">
                        <div class="list-section list-header">
                            <div class="list-username">用户名</div>
                            <div class="list-email">邮箱</div>
                            <div class="list-date">时间</div>
                            <div class="list-action">操作</div>
                        </div>
                        <div v-for="item in list" class="list-section">
                            <div class="list-username">{{ item.username }}</div>
                            <div class="list-email">{{ item.email }}</div>
                            <div class="list-date">{{ item.creat_date }}</div>
                            <div class="list-action">
                                <router-link :to="'/backend/admin/modify/' + item._id" class="badge badge-success">编辑</router-link>
                                <a href="javascript:;">删除</a>
                            </div>
                        </div>
                    </div>
                    <div v-if="hasNext" class="settings-footer clearfix">
                        <a class="admin-load-more" href="javascript:;">加载更多</a>
                    </div>
                </div>
            </div>
        </div>
        <backend-menu></backend-menu>
    </div>
</template>

<script lang="babel">
import api from '~api'
import backendMenu from '~components/backend-menu.vue'
export default {
    name: 'backend-admin-list',
    data() {
        return {
            page: 1,
            limit: 10,
            hasNext: false,
            list: []
        }
    },
    components: {
        backendMenu
    },
    methods: {
        async loadMore(page = 1) {
            const { data: { data, code }} = await api.get('backend/admin/list', { page })
            if (code === 200) {
                this.page = page + 1
                this.hasNext = data.hasNext
                if (page === 1) {
                    this.list = data.list
                } else {
                    this.list = this.list.concat(data.list)
                }
            }
        }
    },
    mounted() {
        this.loadMore()
    },
}
</script>
