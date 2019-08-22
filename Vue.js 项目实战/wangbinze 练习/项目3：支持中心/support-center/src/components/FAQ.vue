<template>
  <main class="gaq">
    <h1>常见的问题</h1>
    <!-- <Loading v-if="loading"> -->
    <div class="error" v-if="erros">无法加载问题</div>
    <section class="list">
      <article v-for="question of questions">
        <h2 v-html="question.title"></h2>
        <p v-html="question.content"></p>
      </article>
    </section>
  </main>
</template>


<script>
export default {
  data() {
    return {
      questions: [],
      error: null,
      loading:false
    };
  },
  async created() {
    // try {
    //   const response = await fetch(
    //     ""
    //   );
    //   if (response.ok) {
    //     this.questions = await response.json;
    //   } else {
    //     throw new Error("error");
    //   }
    // } catch (e) {
    //   this.error = e;
    // }
    this.loading = true
    try{
      const response = await
      fetch('url')
    }catch(e){
      this.error=e
    }
    this.loading = false
  }
};
</script>