<template>
  <section class="min-h-screen bg-transparent p-6 sm:p-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500">Painel principal</p>
          <h1 class="mt-1 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
            Olá, {{ authStore.user?.name || 'Usuário' }}
          </h1>
          <p class="mt-2 text-slate-500">
            Bem-vindo à central de atendimento da clínica.
          </p>
        </div>

        <button class="button-secondary w-[140px]" @click="handleLogout">
          Sair
        </button>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        <div class="glass-card rounded-[28px] p-6">
          <p class="text-sm text-slate-500">Perfil</p>
          <h2 class="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">
            {{ authStore.user?.role === 'secretary' ? 'Secretário' : 'Paciente' }}
          </h2>
        </div>

        <div class="glass-card rounded-[28px] p-6">
          <p class="text-sm text-slate-500">Sessão</p>
          <h2 class="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">
            Ativa
          </h2>
        </div>

        <div class="glass-card rounded-[28px] p-6">
          <p class="text-sm text-slate-500">Próximo passo</p>
          <h2 class="mt-2 text-2xl font-bold tracking-[-0.03em] text-slate-950">
            Agendar consulta
          </h2>
        </div>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="glass-card rounded-[32px] p-6 sm:p-8">
          <p class="text-sm font-medium text-slate-500">Visão geral</p>
          <h3 class="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            Sistema pronto para gerenciar sua rotina clínica
          </h3>
          <p class="mt-4 max-w-2xl text-[15px] leading-8 text-slate-600">
            A partir daqui, você poderá criar consultas, consultar horários disponíveis e acompanhar atendimentos em uma experiência visual moderna e organizada.
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <router-link to="/appointments" class="button-primary inline-flex w-[220px] items-center justify-center">
              Ir para agendamentos
            </router-link>
          </div>
        </div>

        <div class="glass-card rounded-[32px] p-6 sm:p-8">
          <p class="text-sm font-medium text-slate-500">Conta conectada</p>
          <div class="mt-5 space-y-4">
            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Nome</p>
              <p class="mt-1 text-base font-semibold text-slate-900">{{ authStore.user?.name }}</p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-slate-400">E-mail</p>
              <p class="mt-1 text-base font-semibold text-slate-900">{{ authStore.user?.email }}</p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Permissão</p>
              <p class="mt-1 text-base font-semibold text-slate-900">{{ authStore.user?.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>