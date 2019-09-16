<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/index">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/page">Page</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" :to="{name:'首页'}">Home</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
