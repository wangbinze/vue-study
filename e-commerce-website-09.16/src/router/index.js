import Vue from 'vue';
import Router from 'vue-router';
//官方的元件
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import Products from '@/components/pages/Products'


Vue.use(Router);

export default new Router({

    // mode: 'history',
    routes: [{
        path: '*',
        redirect: 'login',   //避免用于输入其他路径进入空白页
    }, {
        name: 'HelloWorld', //组件呈现的名称
        path: '/', //对应的虚拟路径
        component: HelloWorld, //对应的组件
        meta: {
            requiresAuth: true
        },
    }, {
        name: 'Login',
        path: '/login',
        component: Login,
    },{
        name: 'Dashboard',
        path: '/admin',
        component: Dashboard,
        children:[
            {
                name: 'Products',
                path: 'products',
                component: Products,
                meta: {
                    requiresAuth: true
                },
            },
        ]
    }]
})