<template>
  <section class="page-shell grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
    <div class="relative hidden overflow-hidden lg:flex">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(160deg,_#eff6ff_0%,_#f8fafc_45%,_#eef2ff_100%)]"></div>

      <div class="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60">
            <span class="text-lg font-black text-slate-900">C</span>
          </div>
          <div>
            <p class="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">Clínica Health</p>
            <h1 class="text-lg font-bold text-slate-900">Atendimento Inteligente</h1>
          </div>
        </div>

        <div class="max-w-xl">
          <div class="mb-6 inline-flex rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-md">
            Plataforma premium para gestão clínica
          </div>

          <h2 class="max-w-lg text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 xl:text-6xl">
            Um novo padrão de experiência para clínicas modernas.
          </h2>

          <p class="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Centralize autenticação, consultas e gestão administrativa em uma interface elegante, segura e intuitiva.
          </p>

          <div class="mt-10 grid gap-4 sm:grid-cols-3">
            <div class="glass-card rounded-3xl p-5">
              <p class="text-sm text-slate-500">Atendimentos</p>
              <h3 class="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">+2.4k</h3>
            </div>
            <div class="glass-card rounded-3xl p-5">
              <p class="text-sm text-slate-500">Pacientes</p>
              <h3 class="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">+980</h3>
            </div>
            <div class="glass-card rounded-3xl p-5">
              <p class="text-sm text-slate-500">Eficiência</p>
              <h3 class="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">94%</h3>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-6 text-sm text-slate-500">
          <span>Segurança de acesso</span>
          <span>Experiência premium</span>
          <span>Gestão inteligente</span>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center p-6 sm:p-8 lg:p-10">
      <div class="glass-card w-full max-w-md rounded-[32px] p-6 sm:p-8">
        <div class="mb-8">
          <div class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-bold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
            C
          </div>
          <h2 class="text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            Entrar na plataforma
          </h2>
          <p class="mt-2 text-[15px] leading-7 text-slate-500">
            Acesse sua conta para acompanhar consultas e gerenciar atendimentos.
          </p>
        </div>

        <form class="space-y-5" @submit.prevent="handleLogin">
          <div>
            <label class="label-ui">E-mail</label>
            <input v-model="form.email" class="input-ui" type="email" placeholder="seuemail@clinica.com" />
          </div>

          <div>
            <label class="label-ui">Senha</label>
            <input v-model="form.password" class="input-ui" type="password" placeholder="Digite sua senha" />
          </div>

          <div v-if="errorMessage" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {{ errorMessage }}
          </div>

          <button type="submit" class="button-primary w-full" :disabled="loading">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <div class="mt-8 border-t border-slate-200/70 pt-6 text-center text-sm text-slate-500">
          Não possui conta?
          <router-link to="/register" class="ml-1 font-semibold text-blue-600">
            Criar cadastro
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: ''
})

async function handleLogin() {
  try {
    loading.value = true
    errorMessage.value = ''

    await authStore.login({
      email: form.email,
      password: form.password
    })

    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Não foi possível realizar o login'
  } finally {
    loading.value = false
  }
}
</script>