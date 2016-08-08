<style>

body {
    font-family: Helvetica, sans-serif;
}

.router-link-active {
    color: red;
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
    <router-view class="view"></router-view>
</div>

</template>
