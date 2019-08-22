<template>
  <nav class="menu">
    <!-- 链接在这里 -->
    <router-link :to="{name:'home'}" exact>Home</router-link>  <!-- exact prop,它是一个布尔值，如果这是为true，则仅在当前路径完全匹配时，链接才能获得active class -->
    <router-link :to="{name:'faq'}">FAQ</router-link>
    <!-- 效果同上 -->
    <!-- <router-link to="/">Home</router-link> -->
    <!-- <router-link to="/faq">FAQ</router-link> -->
  </nav>
</template>


<style lang="stylus" scoped>
@import '../style/imports';

.router-link-active {
  border-bottom-color: $primary-color;
}
</style>