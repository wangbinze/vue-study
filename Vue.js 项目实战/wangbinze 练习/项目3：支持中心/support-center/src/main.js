import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
// import VueRouter from 'vue-router'
import router from './router'

Vue.use(router)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(AppLayout),
}).$mount('#app')