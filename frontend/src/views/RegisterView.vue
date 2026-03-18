<template>
  <section class="page-shell grid min-h-screen lg:grid-cols-[0.92fr_1.08fr]">
    <div class="flex items-center justify-center p-6 sm:p-8 lg:p-10">
      <div class="glass-card w-full max-w-md rounded-[32px] p-6 sm:p-8">
        <div class="mb-8">
          <div class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-bold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
            C
          </div>
          <h1 class="text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            Criar conta
          </h1>
          <p class="mt-2 text-[15px] leading-7 text-slate-500">
            Cadastre-se para acessar o sistema de agendamentos e gestão clínica.
          </p>
        </div>

        <form class="space-y-5" @submit.prevent="handleRegister">
          <div>
            <label class="label-ui">Nome completo</label>
            <input v-model="form.name" class="input-ui" type="text" placeholder="Digite seu nome" />
          </div>

          <div>
            <label class="label-ui">E-mail</label>
            <input v-model="form.email" class="input-ui" type="email" placeholder="seuemail@clinica.com" />
          </div>

          <div>
            <label class="label-ui">Senha</label>
            <input v-model="form.password" class="input-ui" type="password" placeholder="Crie uma senha" />
          </div>

          <div>
            <label class="label-ui">Perfil</label>
            <select v-model="form.role" class="input-ui">
              <option value="patient">Paciente</option>
              <option value="secretary">Secretário</option>
            </select>
          </div>

          <div v-if="errorMessage" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {{ errorMessage }}
          </div>

          <button type="submit" class="button-primary w-full" :disabled="loading">
            {{ loading ? 'Criando conta...' : 'Criar conta' }}
          </button>
        </form>

        <div class="mt-8 border-t border-slate-200/70 pt-6 text-center text-sm text-slate-500">
          Já possui conta?
          <router-link to="/login" class="ml-1 font-semibold text-blue-600">
            Entrar agora
          </router-link>
        </div>
      </div>
    </div>

    <div class="relative hidden overflow-hidden lg:flex">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.18),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.15),_transparent_26%),linear-gradient(160deg,_#f8fafc_0%,_#eef2ff_48%,_#e0f2fe_100%)]"></div>

      <div class="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
        <div class="flex items-center gap-3">
          <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60">
            <span class="text-lg font-black text-slate-900">C</span>
          </div>
          <div>
            <p class="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">Clínica Health</p>
            <h2 class="text-lg font-bold text-slate-900">Experiência premium</h2>
          </div>
        </div>

        <div class="max-w-xl">
          <div class="mb-6 inline-flex rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-md">
            Design clean, fluxo intuitivo e performance
          </div>

          <h2 class="max-w-lg text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 xl:text-6xl">
            Uma jornada digital elegante para pacientes e equipe clínica.
          </h2>

          <p class="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Cadastro simples, autenticação segura e gestão centralizada em uma interface pensada para transmitir confiança.
          </p>

          <div class="mt-10 grid gap-4 sm:grid-cols-2">
            <div class="glass-card rounded-3xl p-5">
              <p class="text-sm text-slate-500">Fluxo</p>
              <h3 class="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">Intuitivo</h3>
            </div>
            <div class="glass-card rounded-3xl p-5">
              <p class="text-sm text-slate-500">Acesso</p>
              <h3 class="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">Seguro</h3>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-6 text-sm text-slate-500">
          <span>UI refinada</span>
          <span>Autenticação JWT</span>
          <span>Gestão em tempo real</span>
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
  name: '',
  email: '',
  password: '',
  role: 'patient'
})

async function handleRegister() {
  try {
    loading.value = true
    errorMessage.value = ''

    await authStore.register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    })

    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Não foi possível criar a conta'
  } finally {
    loading.value = false
  }
}
</script>