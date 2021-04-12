import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/common/Index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/common/LoginRegister.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '/404',
        component: () => import('../views/common/404.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router