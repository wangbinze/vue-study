import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import 'bootstrap';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.use(Vuex);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');