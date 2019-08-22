import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
// import VueRouter from 'vue-router'
import router from './router'
import './global-components'
import VueFetch from './plugins/fetch'

Vue.use(VueFetch, {
    baseUrl: 'http://localhost:3000/',
})

Vue.use(router)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(AppLayout),
}).$mount('#app')