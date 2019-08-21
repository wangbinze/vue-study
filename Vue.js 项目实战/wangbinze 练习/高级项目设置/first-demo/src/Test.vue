<template>
    <div id="app">
        <p>{{ message }}</p>
        <input v-model="message">
    </div>
</template>

<script>
export default {
    data() {
        return {
            message:"hello world",
        }
    },
}
</script>

<style scoped>
    p{
        color: gray;
    }
</style>