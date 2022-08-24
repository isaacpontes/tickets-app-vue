<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../services/api'
import BoardsTable from '../components/BoardsTable.vue'

const boards = ref([])

async function fetchBoards() {
  const response = await api.get('/boards')
  boards.value = response.data
}

onMounted(() => {
  fetchBoards()
})

</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Mesas</h1>
  </div>
  <hr>
  <BoardsTable :boards="boards" />
</template>