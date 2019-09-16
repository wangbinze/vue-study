<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <a href="#" @click.prevent="signout">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    }
  },
  methods: {
    signout(){
      const api = "https://vue-course-api.herokuapp.com/logout";
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if(response.data.success){
          vm.$router.push('/login');
        }
      });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
