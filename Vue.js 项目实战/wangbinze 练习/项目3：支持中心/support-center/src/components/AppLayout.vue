<template>
  <div class="app-layout">
    <header class="header">
      <div class="img" src="../assets/logo.svg"></div>
      <div>我的衬衫店</div>
    </header>

    <!-- 菜单将放在这里 -->
    <NavMenu />

    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from './NavMenu.vue'

export default {
    components:{
        NavMenu
    }
}
</script>

<style lang="stylus">
    @import '../style/main';
</style>

<style lang="stylus" scoped>
.header {
  .img {
    width: 64px;
    height: 64px;
  }
}
</style>
