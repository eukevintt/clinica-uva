import { defineStore } from 'pinia'
import api from '../api/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || ''
    }),

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {
        async login(payload) {
            const { data } = await api.post('/auth/login', payload)

            this.user = data.user
            this.token = data.token

            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)
        },

        async register(payload) {
            const { data } = await api.post('/auth/register', payload)

            this.user = data.user
            this.token = data.token

            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)
        },

        logout() {
            this.user = null
            this.token = ''

            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    }
})