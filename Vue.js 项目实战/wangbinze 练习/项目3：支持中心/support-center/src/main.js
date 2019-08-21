import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
    render: h => h('div', 'Support center'),
}).$mount('#app')