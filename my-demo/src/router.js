import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from './components/HelloWorld.vue'
// import Player from './components/Player';
// import PlayerProfile from './components/Player/Profile.vue';
// import PlayerStats from './components/Player/Stats.vue'

import SettingHeader from './components/setting/Header';
import SettingSidebar from './components/setting/Sidebar';
import SettingDetail from './components/setting/Detail';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            // component: HelloWorld
            components: {
                myHeader: SettingHeader,
                mySidebar: SettingSidebar,
                myDetail: SettingDetail
            }
        },
        // {
        //     path: '/player/:uid',
        //     name: 'Player',
        //     component: Player,
        //     children: [{
        //             path: 'profile',
        //             component: PlayerProfile
        //         },
        //         {
        //             path: 'stats',
        //             component: PlayerStats
        //         }
        //     ]
        // }
    ]
})