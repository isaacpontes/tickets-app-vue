<script setup>
import { onMounted, reactive, ref } from 'vue';
import { api } from '../services/api';
import NavLink from '../components/common/NavLink.vue';
import { jsPDF } from 'jspdf'
import autotable from 'jspdf-autotable'

const report = reactive({ inventories: [], boards: [] })
const activeTab = ref('start')
const today = new Date().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})

async function fetchReportData() {
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
  fetchReportData()
})

function download() {
  const month = new Date()
    .toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    .replace(/^[0-9]+\sde\s/, '')
  const body = report.inventories.map(entry => [
    entry.inventory.location.name,
    `${entry.previousTickets / 100} talões / ${entry.previousTickets} tickets`,
    `${entry.ticketsAdded / 100} talões / ${entry.ticketsAdded} tickets`,
    `${entry.ticketsWithdrawn / 100} talões / ${entry.ticketsWithdrawn} tickets`,
    `${entry.finalTickets / 100} talões / ${entry.finalTickets} tickets`,
  ])
  const doc = new jsPDF({ orientation: 'landscape' })
  doc.setFontSize(12)
  doc.addImage('/logo.png', 'png', 14, 11)
  doc.text('Programa Fidelense Cidadão', 48, 16)
  doc.text('Balanço Geral Mensal', 48, 22)
  doc.text(`Relatório de estoque de tickets referente ao mês de ${month}`, 48, 28)
  doc.line(14, 32, 283, 32)
  autotable(doc, {
    head: [[
      'Localidade',
      'Saldo Anterior',
      'Entradas',
      'Saídas',
      'Saldo Atual'
    ]],
    body: body,
    startY: 36
  })
  doc.save('balanco-geral-mensal.pdf')
}
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
    <li class="nav-item">
      <NavLink to="#" :is-active="activeTab === 'reports'" @click="activeTab = 'reports'">Relatórios</NavLink>
    </li>
  </nav>
  <section v-if="activeTab === 'start'" class="py-3 px-2">
    <h2 class="fs-4">Olá! 👋</h2>
  </section>
  <section v-else-if="activeTab === 'boards'" class="py-3 px-2">
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
    <button class="btn btn-primary mb-4" @click="download">Exportar PDF</button>
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
  <section v-else-if="activeTab === 'reports'" class="py-3 px-2">
    <h2 class="fs-4">Relatórios</h2>
  </section>
</template>