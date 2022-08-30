<script setup>
import { generatePdfReport } from '../services/pdf'

const props = defineProps(['boards'])

const today = new Date().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})

function download() {
  const month = new Date()
    .toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    .replace(/^[0-9]+\sde\s/, '')
  const body = props.boards?.map(entry => [
    entry.board.location.name,
    `${entry.previousTickets / 100} talões / ${entry.previousTickets} tickets`,
    `${entry.ticketsWithdrawn / 100} talões / ${entry.ticketsWithdrawn} tickets`,
    `${entry.ticketsRequested / 100} talões / ${entry.ticketsRequested} tickets`,
    `${entry.finalTickets / 100} talões / ${entry.finalTickets} tickets`,
  ])
  generatePdfReport({
    title: 'Balanço Geral Mensal',
    description: `Relatório de tickets na mesa referente ao mês de ${month}`,
    thead: [[ 'Localidade', 'Saldo Anterior', 'Entradas', 'Saídas', 'Saldo Atual' ]],
    tbody: body,
    filename: 'balanco-geral-mesa'
  })
}
</script>

<template>
  <section class="py-3 px-2">
    <h2 class="fs-4">Mesa</h2>
    <p>Balanço geral dos tickets da mesa referente ao mês atual até o dia de hoje ({{ today }}).</p>
    <button class="btn btn-primary mb-4" @click="download">Exportar PDF</button>
    <div class="row">
      <div v-for="entry in boards" class="col col-6 col-lg-4 mb-4">
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
</template>