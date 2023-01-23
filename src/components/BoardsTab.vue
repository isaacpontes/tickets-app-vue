<script setup>
import { generatePdfReport } from '../services/pdf'
import Button from './common/Button.vue';
import Card from './common/Card.vue';
import H2 from './common/H2.vue';
import H3 from './common/H3.vue';

const props = defineProps(['boards'])

const { format } = new Intl.NumberFormat('pt-br')

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
    <H2>Mesa</H2>
    <p>Balanço geral dos tickets da mesa referente ao mês atual até o dia de hoje ({{ today }}).</p>
    <Button class="mb-4" @click="download">Exportar PDF</Button>
    <div class="row">
      <div v-for="entry in boards" class="col col-6 col-lg-4 mb-4">
        <Card>
          <H3>{{ entry.board?.location?.name }}</H3>
          <div class="d-flex align-items-center justify-content-between">
            <span>Saldo Anterior: </span>
            <span>{{ format( entry.previousTickets) }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <span>Entradas: </span>
            <span>{{ format( entry.ticketsWithdrawn) }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <span>Saídas: </span>
            <span>{{ format( entry.ticketsRequested) }}</span>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <span>Saldo Atual: </span>
            <span>{{ format( entry.finalTickets) }}</span>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>