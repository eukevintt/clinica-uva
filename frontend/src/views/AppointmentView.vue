<template>
  <section class="min-h-screen bg-transparent p-6 sm:p-8">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500">Gestão de consultas</p>
          <h1 class="mt-1 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
            Agendamentos
          </h1>
          <p class="mt-2 max-w-2xl text-slate-500">
            Crie novos atendimentos e acompanhe as consultas registradas em uma visão clara e elegante.
          </p>
        </div>

        <div class="flex gap-3">
          <router-link to="/dashboard" class="button-secondary inline-flex w-[180px] items-center justify-center">
            Voltar ao painel
          </router-link>
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div class="glass-card rounded-[32px] p-6 sm:p-8">
          <div class="mb-6">
            <p class="text-sm font-medium text-slate-500">Novo agendamento</p>
            <h2 class="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              Marcar consulta
            </h2>
            <p class="mt-2 text-sm leading-7 text-slate-500">
              Informe data, horário e CEP para registrar o atendimento.
            </p>
          </div>

          <form class="space-y-5" @submit.prevent="handleCreateAppointment">
            <div>
              <label class="label-ui">Data</label>
              <input v-model="form.date" class="input-ui" type="date" />
            </div>

            <div>
              <label class="label-ui">Horário</label>
              <input v-model="form.time" class="input-ui" type="time" />
            </div>

            <div>
              <label class="label-ui">CEP</label>
              <input v-model="form.cep" class="input-ui" type="text" placeholder="00000000" />
            </div>

            <div v-if="successMessage" class="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {{ errorMessage }}
            </div>

            <button type="submit" class="button-primary w-full" :disabled="loadingCreate">
              {{ loadingCreate ? 'Agendando...' : 'Confirmar agendamento' }}
            </button>
          </form>
        </div>

        <div class="glass-card rounded-[32px] p-6 sm:p-8">
          <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-medium text-slate-500">Consultas registradas</p>
              <h2 class="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                Lista de agendamentos
              </h2>
            </div>

            <button class="button-secondary w-full sm:w-[150px]" @click="fetchAppointments">
              Atualizar
            </button>
          </div>

          <div v-if="loadingList" class="grid gap-4">
            <div class="rounded-[24px] border border-slate-200/70 bg-white/70 p-5">
              <p class="text-sm text-slate-500">Carregando consultas...</p>
            </div>
          </div>

          <div v-else-if="appointments.length === 0" class="rounded-[28px] border border-dashed border-slate-300/80 bg-white/50 p-10 text-center">
            <p class="text-lg font-semibold text-slate-800">Nenhuma consulta encontrada</p>
            <p class="mt-2 text-sm text-slate-500">
              Assim que um atendimento for agendado, ele aparecerá aqui.
            </p>
          </div>

          <div v-else class="grid gap-4">
            <article
              v-for="appointment in appointments"
              :key="appointment._id"
              class="rounded-[28px] border border-slate-200/70 bg-white/75 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
            >
              <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div class="flex flex-wrap items-center gap-3">
                    <h3 class="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                      {{ appointment.patient?.name || 'Paciente' }}
                    </h3>
                    <span
                      class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                      :class="getStatusClass(appointment.status)"
                    >
                      {{ getStatusLabel(appointment.status) }}
                    </span>
                  </div>

                  <p class="mt-2 text-sm text-slate-500">
                    {{ appointment.patient?.email }}
                  </p>
                </div>

                <div class="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                  {{ formatDate(appointment.date) }} • {{ appointment.time }}
                </div>
              </div>

              <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p class="text-xs uppercase tracking-[0.18em] text-slate-400">CEP</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">{{ appointment.cep }}</p>
                </div>

                <div>
                  <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Cidade</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">
                    {{ appointment.city }} - {{ appointment.state }}
                  </p>
                </div>

                <div>
                  <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Bairro</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">{{ appointment.neighborhood || '—' }}</p>
                </div>

                <div>
                  <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Clima</p>
                  <p class="mt-1 text-sm font-semibold text-slate-900">{{ appointment.weatherAlert || 'Não informado' }}</p>
                </div>
              </div>

              <div class="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
                <p class="text-xs uppercase tracking-[0.18em] text-slate-400">Endereço</p>
                <p class="mt-1 text-sm font-semibold text-slate-900">
                  {{ appointment.street || 'Endereço não informado' }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import api from '../api/api'

const loadingCreate = ref(false)
const loadingList = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const appointments = ref([])

const form = reactive({
  date: '',
  time: '',
  cep: ''
})

function formatDate(date) {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

function getStatusLabel(status) {
  const map = {
    scheduled: 'Agendada',
    completed: 'Concluída',
    canceled: 'Cancelada'
  }

  return map[status] || status
}

function getStatusClass(status) {
  const map = {
    scheduled: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
    completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    canceled: 'bg-red-50 text-red-700 ring-1 ring-red-200'
  }

  return map[status] || 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
}

async function fetchAppointments() {
  try {
    loadingList.value = true
    const { data } = await api.get('/appointments')
    appointments.value = data.appointments || []
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Não foi possível carregar os agendamentos'
  } finally {
    loadingList.value = false
  }
}

async function handleCreateAppointment() {
  try {
    loadingCreate.value = true
    errorMessage.value = ''
    successMessage.value = ''

    await api.post('/appointments', {
      date: form.date,
      time: form.time,
      cep: form.cep
    })

    successMessage.value = 'Consulta agendada com sucesso'
    form.date = ''
    form.time = ''
    form.cep = ''

    await fetchAppointments()
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Não foi possível criar o agendamento'
  } finally {
    loadingCreate.value = false
  }
}

onMounted(() => {
  fetchAppointments()
})
</script>