<script setup>
import { onMounted, reactive, ref } from 'vue';
import { api } from '../services/api';
import NavLink from '../components/common/NavLink.vue';

const report = reactive({ inventories: [], boards: [] })
const activeTab = ref('boards')
const today = new Date().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})

async function getReport() {
  try {
    const response = await api.get('/reports/general/monthly')
    console.log(response.data)
    report.boards = response.data.boards
    report.inventories = response.data.inventories
  } catch (err) {
    console.error(err.message)
  }
}

onMounted(() => {
  getReport()
})
</script>

<template>
  <h1>Início</h1>
  <hr>
  <nav class="nav nav-tabs">
    <li class="nav-item">
      <NavLink to="#" :is-active="activeTab === 'start'" @click="activeTab = 'start'">Início</NavLink>
    </li>
    <li class="nav-item">
      <NavLink to="#" :is-active="activeTab === 'boards'" @click="activeTab = 'boards'">Mesa</NavLink>
    </li>
    <li class="nav-item">
      <NavLink to="#" :is-active="activeTab === 'inventories'" @click="activeTab = 'inventories'">Estoque</NavLink>
    </li>
  </nav>
  <section v-if="activeTab === 'start'" class="py-3 px-2">
    <h2 class="fs-4">Olá! 👋</h2>
  </section>
  <section v-if="activeTab === 'boards'" class="py-3 px-2">
    <h2 class="fs-4">Mesa</h2>
    <p>Balanço geral dos tickets da mesa referente ao mês atual até o dia de hoje ({{ today }}).</p>
    <div class="row">
      <div v-for="entry in report.boards" class="col col-6 col-lg-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h3 class="fs-6">{{ entry.board?.location?.name }}</h3>
            <div class="d-flex align-items-center justify-content-between">
              <span>Saldo Anterior: </span>
              <span>{{ entry.previousTickets }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span>Entradas: </span>
              <span>{{ entry.ticketsWithdrawn }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span>Saídas: </span>
              <span>{{ entry.ticketsRequested }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span>Saldo Atual: </span>
              <span>{{ entry.finalTickets }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else-if="activeTab === 'inventories'" class="py-3 px-2">
    <h2 class="fs-4">Estoque</h2>
    <p>Balanço geral dos tickets no estoque referente ao mês atual até o dia de hoje ({{ today }}).</p>
    <div class="row">
      <div v-for="entry in report.inventories" class="col col-6 col-lg-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h3 class="fs-6">{{ entry.inventory?.location?.name }}</h3>
            <div class="d-flex align-items-center justify-content-between">
              <span>Saldo Anterior: </span>
              <span>{{ entry.previousTickets }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span>Entradas: </span>
              <span>{{ entry.ticketsAdded }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span>Saídas: </span>
              <span>{{ entry.ticketsWithdrawn }}</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span>Saldo Atual: </span>
              <span>{{ entry.finalTickets }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>