import Vue from 'vue'
import Test from './Test.vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'

Vue.config.productionTip = false

// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app')

// new Vue({
//     el: "#app",
//     Test,
// })

new Vue({
    // router,
    Test,
    render: h => h(Test)
}).$mount('#app')