import Vue from 'vue'
import axios from 'axios' //主要的ajax套件
import VueAxios from 'vue-axios'  //将它转为Vue的套件
import App from './App.vue'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
