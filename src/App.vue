<template>

<div id="app">
    <div class="g-doc">
        <div class="g-hd">
            <About></About>
            <div v-if="visit" class="box menu">
                <div class="m-sch">
                    <input @keyup.enter="search($event)" id="search_content" class="sch" type="text" name="q" placeholder="记得按回车哦" />
                </div>
                <div class="m-nav">
                    <ul class="menuOpen">
                        <li class="tag-all">
                            <router-link to="/" exact><i></i>All</router-link>
                        </li>
                        <li class="tag-life">
                            <router-link to="/category/1"><i></i>Life</router-link>
                        </li>
                        <li class="tag-study">
                            <router-link to="/category/2"><i></i>Study</router-link>
                        </li>
                        <li class="tag-other">
                            <router-link to="/category/3"><i></i>Other</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="!visit" class="box menu">
                <div class="m-nav">
                    <ul class="menuOpen">
                        <li class="tag-all">
                            <router-link to="/" exact>All</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <router-view class="router"></router-view>
        </transition>
        <div class="g-ft">
            <span class="copy"><span title="Copyright">©</span> <a href="/">M·M·F 小屋</a> 2016.06</span>
            <span class="beian"><i></i> <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=000000000000">浙公网安备 000000000000号</a></span>
        </div>
        <div class="arrow">
            <a class="go-top" href="javascript:;" @click="goTop"></a>
            <a class="go-back" href="javascript:;" @click="goBack"></a>
        </div>
    </div>
</div>

</template>

<script>
import About from './components/About.vue'

export default {
    components: {
        About
    },
    methods: {
        goBack() {},
        goTop() {},
        search(e) {
            var qs = e.target.value
            if (qs === "") {
                return false
            }
        }
    },
    computed: {
        visit() {
            return true
        }
    }
}

</script>
<style src="./App.css"></style>
