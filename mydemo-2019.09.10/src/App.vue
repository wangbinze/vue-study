<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <h1>这是app的h1</h1>
    <div class="card" style="width:18rem;">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">111111111111111111111222222</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  created() {
    this.$http.get("https://randomuser.me/api/").then(response => {
      console.log(response.data);
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
// $color:black;
// body{
//   background-color: $color;
// }

// @import "~bootstrap/scss/bootstrap";
</style>
