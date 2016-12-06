<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-username">用户名</div>
                <div class="list-email">邮箱</div>
                <div class="list-date">时间</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in admin.data" class="list-section">
                <div class="list-username">{{ item.username }}</div>
                <div class="list-email">{{ item.email }}</div>
                <div class="list-date">{{ item.creat_date }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/admin/modify/' + item._id" class="badge badge-success">编辑</router-link>
                    <a href="javascript:;">删除</a>
                </div>
            </div>
        </div>
        <div v-if="admin.hasNext" class="settings-footer clearfix">
            <a @click="loadMore()" class="admin-load-more" href="javascript:;">加载更多</a>
        </div>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
const fetchInitialData = async (store, config = { page: 1}) => {
    await store.dispatch('backend/getAdminList', config)
}
export default {
    name: 'backend-admin-list',
    computed: {
        ...mapGetters({
            admin: 'backend/getAdminList'
        })
    },
    methods: {
        loadMore(page = this.admin.page + 1) {
            fetchInitialData(this.$store, {page})
        }
    },
    mounted() {
        if (this.admin.data.length <= 0) {
            fetchInitialData(this.$store)
        }
    }
}
</script>
