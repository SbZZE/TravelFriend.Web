import { getTransitionRawChildren } from '@vue/runtime-core'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/common/LoginRegister.vue')
    },
    {
        path: '/home',
        name: 'Index',
        component: () => import('../views/common/Index.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '/404',
        component: () => import('../views/common/404.vue')
    },
    {
        path: '/personal',
        name: 'PersonalCenter',
        component: () => import('../views/personal/PersonalCenter.vue'),
        children: [
            {
            path: 'album',
            name: 'PersonalAlbum',
            component: () => import('../views/personal/PersonalAlbum.vue'),
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router