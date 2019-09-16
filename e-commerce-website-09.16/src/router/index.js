import Vue from 'vue';
import Router from 'vue-router';
//官方的元件
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'


Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
        name: 'HelloWorld', //组件呈现的名称
        path: '/', //对应的虚拟路径
        component: HelloWorld, //对应的组件
    }, {
        name: 'Login',
        path: '/login',
        component: Login,
    }]
})