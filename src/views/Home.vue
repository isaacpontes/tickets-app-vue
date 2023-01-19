<script setup>
import { onMounted, reactive, ref } from 'vue';
import NavLink from '../components/common/NavLink.vue';
import BoardsTab from '../components/BoardsTab.vue';
import InventoriesTab from '../components/InventoriesTab.vue';
import ReportsTab from '../components/ReportsTab.vue';
import { getGeneralMonthlyReport } from '../services/reports';
import H2 from '../components/common/H2.vue';

const report = reactive({ inventories: [], boards: [] })
const activeTab = ref('start')

async function fetchReportData() {
  const { boards, inventories } = await getGeneralMonthlyReport()
  report.boards = boards
  report.inventories = inventories
}

onMounted(() => {
  fetchReportData()
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
    <li class="nav-item">
      <NavLink to="#" :is-active="activeTab === 'reports'" @click="activeTab = 'reports'">Relatórios</NavLink>
    </li>
  </nav>
  <section v-if="activeTab === 'start'" class="py-3 px-2">
    <H2>Olá! 👋</H2>
  </section>
  <BoardsTab v-if="activeTab === 'boards'" :boards="report.boards" />
  <InventoriesTab v-if="activeTab === 'inventories'" :inventories="report.inventories" />
  <ReportsTab v-else-if="activeTab === 'reports'" :boards="report.boards" :inventories="report.inventories" />
</template>