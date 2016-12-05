<template>
    <nav class="global-nav">
        <div class="wrap clearfix">
            <div class="left-part"><router-link to="/" exact class="logo-link"><i class="icon icon-nav-logo"></i><span class="hidden">M.M.F 小屋</span></router-link>
                <div class="main-nav">
                    <router-link to="/" class="nav-link current"><i class="icon icon-nav-home"></i><span class="text">首页</span></router-link>
                    <router-link to="/hot" class="nav-link"><i class="icon icon-nav-explore"></i><span class="text">热门</span></router-link>
                    <router-link to="/about" class="nav-link"><i class="icon icon-nav-features"></i><span class="text">关于</span></router-link>
                </div>
            </div>
            <div class="right-part">
                <span class="nav-search"><i class="icon icon-search-white"></i><input @keyup.enter="search($event)" placeholder="记得按回车哦" class="nav-search-input"></span>
                <span class="nav-me"><a class="nav-me-link"><img src="/static/images/avatar.png" class="nav-avatar-img"></a></span>
            </div>
        </div>
    </nav>
</template>

<script lang="babel">
export default {
    methods: {
        search(e) {
            var qs = e.target.value
            if (qs === "") {
                return false
            }
            this.$router.replace('/search/' + qs)
        }
    }
}
</script>
