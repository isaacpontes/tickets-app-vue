<script setup>
import { onMounted, reactive, ref } from 'vue';
import { api } from '../services/api';
import NavLink from '../components/common/NavLink.vue';
import BoardsTab from '../components/BoardsTab.vue';
import InventoriesTab from '../components/InventoriesTab.vue';

const report = reactive({ inventories: [], boards: [] })
const activeTab = ref('start')

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
  <BoardsTab v-if="activeTab === 'boards'" :boards="report.boards" />
  <InventoriesTab v-if="activeTab === 'inventories'" :inventories="report.inventories" />
  <section v-else-if="activeTab === 'reports'" class="py-3 px-2">
    <h2 class="fs-4">Relatórios</h2>
  </section>
</template>