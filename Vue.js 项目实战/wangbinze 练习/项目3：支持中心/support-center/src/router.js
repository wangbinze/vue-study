import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'

Vue.use(VueRouter)


const routes = [
    //路由将放在这里
    { path: '/', name: 'home', component: Home },
    { path: '/faq', name: 'faq', component: FAQ },
]

const router = new VueRouter({
    routes,
    mode: 'history' //可选项，默认为hash，url有#，history无#，不能再ie9或以下版本运行
})


export default router