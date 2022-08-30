<script setup>
import { generatePdfReport } from '../services/pdf'

const props = defineProps(['inventories'])

const today = new Date().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})

function download() {
  const month = new Date()
    .toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    .replace(/^[0-9]+\sde\s/, '')
  const body = props.inventories?.map(entry => [
    entry.inventory.location.name,
    `${entry.previousTickets / 100} talões / ${entry.previousTickets} tickets`,
    `${entry.ticketsAdded / 100} talões / ${entry.ticketsAdded} tickets`,
    `${entry.ticketsWithdrawn / 100} talões / ${entry.ticketsWithdrawn} tickets`,
    `${entry.finalTickets / 100} talões / ${entry.finalTickets} tickets`,
  ])
  generatePdfReport({
    title: 'Balanço Geral Mensal',
    description: `Relatório de estoque de tickets referente ao mês de ${month}`,
    thead: [[ 'Localidade', 'Saldo Anterior', 'Entradas', 'Saídas', 'Saldo Atual' ]],
    tbody: body
  })
}
</script>

<template>
  <section class="py-3 px-2">
    <h2 class="fs-4">Estoque</h2>
    <p>Balanço geral dos tickets no estoque referente ao mês atual até o dia de hoje ({{ today }}).</p>
    <button class="btn btn-primary mb-4" @click="download">Exportar PDF</button>
    <div class="row">
      <div v-for="entry in inventories" class="col col-6 col-lg-4 mb-4">
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