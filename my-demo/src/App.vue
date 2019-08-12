<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <p>
      <router-link to="/">Home</router-link>
      <router-link to="/player/1">库里</router-link>
      <router-link to="/player/2">哈登</router-link>
    </p>
    <button @click="btnClick(1)">库里</button>
    <button @click="btnClick(2)">哈登</button>
    <hr />
    <router-link :to="{ name: 'Player', params: { uid: 1 }}">库里</router-link>
    <router-link :to="{ path: '/player/2/stats' }">哈登</router-link>
    <router-view></router-view>-->

    <table width="100%">
      <tr>
        <td colspan="2" style="background-color:darkgoldenrod">
          <router-link name="myHeader"></router-link>
        </td>
      </tr>
      <tr>
        <td width="20%" style="background-color:thistle">
          <router-view name="mySidebar"></router-view>
        </td>
        <td width="80%" style="background-color:aquamarine">
          <router-view name="myDetail"></router-view>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "app",
  // methods: {
  //   btnClick(uid) {
  //     this.$router.push({ path: `/player/${uid}` });
  //     //this.$router.push({ path: `/player/${uid}/stats` });
  //     //this.$router.push({ name: 'Player', params: { uid: uid } });
  //     //this.$router.push({ path: '/player', query: { uid: uid }}); //url-get参数写法
  //     //url履历控制
  //     //this.$router.go(-1);
  //   }
  // }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
