<template>
  <div class="hello">
    <router-link to="/page/">卡片1</router-link>
    <router-link to="/page/child2">卡片2</router-link>
    <router-link to="/page/child3">卡片3</router-link>
    <div class="card" style="width: 18rem;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
