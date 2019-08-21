<template>
  <ul class="movies">
    <li v-for="movie of movies" class="movie">{{movie.title}}</li>
  </ul>
</template>

<script>
import movie from './movie.vue'
export default {
    comments:{
        movie,
    },
  data() {
    return {
      movies: [{ id: 0, title: "star Wars" }, { id: 1, title: "blade runner" }]
    };
  }
};
</script>