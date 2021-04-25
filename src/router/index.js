import { getTransitionRawChildren } from '@vue/runtime-core'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/account/LoginRegister.vue')
    },
    {
        path: '/home',
        name: 'Index',
        component: () => import('../views/Index.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '/404',
        component: () => import('../views/404.vue')
    },
    {
        path: '/personal',
        name: 'PersonalCenter',
        component: () => import('../views/personal/Center.vue'),
        children: [
            {
            path: 'album',
            name: 'PersonalAlbum',
            component: () => import('../views/personal/Album.vue'),
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router