<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "app",
  // created() {
  //   const api = "https://vue-course-api.herokuapp.com/api/binzetest/products";
  //   //api伺服器路径
  //   //所申请的APIPath
  //   this.$http.get(api).then((response) => {
  //     console.log(response.data);
  //   });
  // }
  created() {
    console.log(process.env.VUE_APP_API)
    console.log(process.env.VUE_APP_API_BASE_URLSSS)
  },
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
