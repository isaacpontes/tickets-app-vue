<script setup>
import { reactive } from 'vue'
import { api } from '../services/api'
import { generateMonthlyBoardsReport } from '../services/boards'
import { generateMonthlyInventoriesReport } from '../services/inventories'
import Button from './common/Button.vue';
import H2 from './common/H2.vue';
import Input from './common/Input.vue';
import Label from './common/Label.vue';

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
    <H2>Relatório Mensal de Mesa</H2>
    <form v-on:submit="handleBoardsReport" class="row align-items-end mb-4">
      <div class="col col-md-4 col-lg-3 col-xl-2 mb-4 mb-md-0">
        <Label for="month" class="form-label">Mês</Label>
        <Input
          id="month"
          v-model="boardsReport.month"
          type="number"
          min="1"
          max="12"
          :placeholder="new Date().getMonth() + 1"
        />
      </div>
      <div class="col col-md-4 col-lg-3 col-xl-2 mb-4 mb-md-0">
        <Label for="year">Ano</Label>
        <Input
          id="year"
          v-model="boardsReport.year"
          type="number"
          min="2000"
          max="2999"
          :placeholder="new Date().getFullYear()"
        />
      </div>
      <div class="col col-12 col-md-4 col-lg-3 col-xl-2">
        <Button>Gerar PDF</Button>
      </div>
    </form>
  </section>
  <section class="pt-3 px-2">
    <h2 class="fs-4">Relatório Mensal de Estoque</h2>
    <form v-on:submit="handleInventoriesReport" class="row align-items-end mb-4">
      <div class="col col-md-4 col-lg-3 col-xl-2 mb-4 mb-md-0">
        <Label for="month">Mês</Label>
        <Input
          id="month"
          v-model="inventoriesReport.month"
          type="number"
          min="1"
          max="12"
          :placeholder="new Date().getMonth() + 1"
        />
      </div>
      <div class="col col-md-4 col-lg-3 col-xl-2 mb-4 mb-md-0">
        <Label for="year">Ano</Label>
        <Input
          id="year"
          v-model="inventoriesReport.year"
          type="number"
          min="2000"
          max="2999"
          :placeholder="new Date().getFullYear()"
        />
      </div>
      <div class="col col-12 col-md-4 col-lg-3 col-xl-2">
        <Button>Gerar PDF</Button>
      </div>
    </form>
  </section>
</template>