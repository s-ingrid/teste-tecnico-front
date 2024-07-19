import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '../axios/authGuard'

const routes = [
    {
        name: 'Login',
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../components/AuthFormManager.vue')
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        beforeEnter: authGuard,
        meta: { requiresAuth: true },
        component: () => import(/* webpackChunkName: "dashboard" */ '../components/Dashboard.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router