import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './authGuard'

const routes = [
    {
        name: 'Login',
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../components/AuthFormManager.vue')
    },
    {
        name: 'Home',
        path: '/',
        beforeEnter: authGuard,
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
    },
    {
        name: 'Usuários',
        path: '/usuarios',
        beforeEnter: authGuard,
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/UserList.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router