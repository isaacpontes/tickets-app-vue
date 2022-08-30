<script setup>
defineProps(['boards'])
const today = new Date().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})
</script>

<template>
  <section class="py-3 px-2">
    <h2 class="fs-4">Mesa</h2>
    <p>Balanço geral dos tickets da mesa referente ao mês atual até o dia de hoje ({{ today }}).</p>
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