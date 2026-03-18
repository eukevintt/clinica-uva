import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import AppointmentView from '../views/AppointmentView.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView
    },
    {
        path: '/appointments',
        name: 'appointments',
        component: AppointmentView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router