import Vue from 'vue'
import axios from 'axios' //主要的ajax套件
import VueAxios from 'vue-axios' //将它转为Vue的套件
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap';
import router from './router'
import App from './App.vue'
import './bus'
import currencyFilter from './filters/currency'

Vue.use(VueAxios, axios)

axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

new Vue({
    render: h => h(App),
    router
}).$mount('#app')

router.beforeEach((to, from, next) => {
    console.log('to', to, 'from', from, 'next', next)
        //验证登录的，登录信息保存后才可进入到主页等其他页面
    if (to.meta.requiresAuth) {
        const api = "https://vue-course-api.herokuapp.com/api/user/check";
        axios.post(api).then((response) => {
            console.log(response.data);
            if (response.data.success) {
                // vm.$router.push('/');
                next();
            } else {
                next({
                    path: '/login',
                })
            }
        });
        // console.log('这里需要验证')
    } else {
        next();
    }
})