import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: () =>
            import ('@/views/Home.vue'),
        meta: {
            iskeep: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('@/views/register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login.vue')
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        component: () =>
            import ('@/views/userinfo.vue'),
        meta: {
            istoken: true
        }
    },
    {
        path: '/edite',
        name: 'edite',
        component: () =>
            import ('@/views/Edite.vue'),
        meta: {
            istoken: true
        },
    }, {
        path: '/video/:id',
        name: 'video',
        component: () =>
            import ('@/views/Video.vue'),
    }, {
        path: '/editeCategory',
        name: 'editetab',
        component: () =>
            import ('@/views/EditeCategory.vue'),
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (!localStorage.getItem('id') && !localStorage.getItem('token') && to.meta.istoken == true) {
        router.push('/login');
        Vue.prototype.$msg.fail('请重新登录')
        return;
    }
    next();


})
export default router