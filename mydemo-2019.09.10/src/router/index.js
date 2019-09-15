import Vue from 'vue';
import VueRouter from 'vue-router';
//官方的元件
import Home from '@/components/HelloWorld';

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            name:'首页',    //组件呈现的名称
            path:'/index',    //对应的虚拟路径
            component: Home, //对应的组件
        }
    ]
})