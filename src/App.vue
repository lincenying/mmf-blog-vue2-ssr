<style>

body {
    font-family: Helvetica, sans-serif;
}

.router-link-active {
    color: red;
}
.view {
  transition: all .35s ease;
}
.view-enter, .view-leave-active {
  opacity: 0;
}
</style>

<template>

<div id="app">
    <ul>
        <li>
            <router-link to="/" exact>Home</router-link>
        </li>
        <li>
            <router-link to="/topics">Topics</router-link>
        </li>
        <li>
            <router-link to="/about">About</router-link>
        </li>
    </ul>
    <transition name="view" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
</div>

</template>
