import Vue from 'vue';
import VueRouter from 'vue-router';
//官方的元件
import Home from '@/components/HelloWorld';
import Page from '@/components/pages/page';
import child from '@/components/pages/child';
import child2 from '@/components/pages/child2';
import child3 from '@/components/pages/child3';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [{
            name: '首页', //组件呈现的名称
            path: '/index', //对应的虚拟路径
            component: Home, //对应的组件
        },
        {
            name: '分页',
            path: '/page',
            component: Page,
            children: [{
                    name: '卡片1', //组件呈现的名称
                    path: '', //对应的虚拟路径
                    component: child, //对应的组件
                },
                {
                    name: '卡片2', //组件呈现的名称
                    path: 'child2', //对应的虚拟路径
                    component: child2, //对应的组件
                },
                {
                    name: '卡片3', //组件呈现的名称
                    path: 'child3', //对应的虚拟路径
                    component: child3, //对应的组件
                }
            ]
        }
    ]
})