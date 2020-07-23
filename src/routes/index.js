
import Home from '@/views/Home.vue'
import play from '@/views/play.vue'

let routes = [
    {
        path: '/',
        name: 'index',
        component: Home,
        title: '主页'
    },
    {
        path: '/play',
        name: 'play',
        component: play,
        title: '播放页'
    },
];
export default routes;