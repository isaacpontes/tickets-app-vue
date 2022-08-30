<script setup>
import { reactive } from 'vue'
import { api } from '../services/api'
import { generateMonthlyBoardsReport } from '../services/boards'
import { generateMonthlyInventoriesReport } from '../services/inventories'

const props = defineProps(['boards', 'inventories'])
const boardsReport = reactive({ boards: [], month: 8, year: 2022 })
const inventoriesReport = reactive({ inventories: [], month: 8, year: 2022 })

async function handleBoardsReport(ev) {
  ev.preventDefault()
  if (boardsReport.month === '' && boardsReport.year === '') {
    generateMonthlyBoardsReport(props.boards)
    return
  }
  try {
    const response = await api.get(`/reports/general/monthly?month=${boardsReport.month}&year=${boardsReport.year}`)
    boardsReport.boards = response.data.boards
    generateMonthlyBoardsReport(boardsReport.boards, boardsReport.month, boardsReport.year)
  } catch (err) {
    console.error(err.message)
    alert("Ocorreu um erro ao gerar o relatório.")
  }
}

async function handleInventoriesReport(ev) {
  ev.preventDefault()
  if (inventoriesReport.month === '' && inventoriesReport.year === '') {
    generateMonthlyInventoriesReport(props.inventories)
    return
  }
  try {
    const response = await api.get(`/reports/general/monthly?month=${inventoriesReport.month}&year=${inventoriesReport.year}`)
    inventoriesReport.inventories = response.data.inventories
    generateMonthlyInventoriesReport(inventoriesReport.inventories, inventoriesReport.month, inventoriesReport.year)
  } catch (err) {
    console.error(err.message)
    alert("Ocorreu um erro ao gerar o relatório.")
  }
}
</script>

<template>
  <section class="pt-3 px-2">
    <h2 class="fs-4">Relatório Mensal de Mesa</h2>
    <form v-on:submit="handleBoardsReport" class="row align-items-end mb-4">
      <div class="col col-md-4 col-lg-3 col-xl-2 mb-4 mb-md-0">
        <label for="month" class="form-label">Mês</label>
        <input
          v-model="boardsReport.month"
          id="month"
          class="form-control"
          type="number"
          min="1"
          max="12"
          :placeholder="new Date().getMonth() + 1"
        />
      </div>
      <div class="col col-md-4 col-lg-3 col-xl-2 mb-4 mb-md-0">
        <label for="year" class="form-label">Ano</label>
        <input
          v-model="boardsReport.year"
          id="year"
          class="form-control"
          type="number"
          min="2000"
          max="2999"
          :placeholder="new Date().getFullYear()"
        />
      </div>
      <div class="col col-12 col-md-4 col-lg-3 col-xl-2">
        <button class="btn btn-primary">Gerar PDF</button>
      </div>
    </form>
  </section>
  <section class="pt-3 px-2">
    <h2 class="fs-4">Relatório Mensal de Estoque</h2>
    <form v-on:submit="handleInventoriesReport" class="row align-items-end mb-4">
      <div class="col col-md-4 col-lg-3 col-xl-2 mb-4 mb-md-0">
        <label for="month" class="form-label">Mês</label>
        <input
          v-model="inventoriesReport.month"
          id="month"
          class="form-control"
          type="number"
          min="1"
          max="12"
          :placeholder="new Date().getMonth() + 1"
        />
      </div>
      <div class="col col-md-4 col-lg-3 col-xl-2 mb-4 mb-md-0">
        <label for="year" class="form-label">Ano</label>
        <input
          v-model="inventoriesReport.year"
          id="year"
          class="form-control"
          type="number"
          min="2000"
          max="2999"
          :placeholder="new Date().getFullYear()"
        />
      </div>
      <div class="col col-12 col-md-4 col-lg-3 col-xl-2">
        <button class="btn btn-primary">Gerar PDF</button>
      </div>
    </form>
  </section>
</template>