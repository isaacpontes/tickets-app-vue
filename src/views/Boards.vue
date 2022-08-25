<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../services/api'
import BoardsTable from '../components/BoardsTable.vue'
import AddTicketRequestModal from '../components/AddTicketRequestModal.vue';

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
    <h1 class="me-4">Mesa</h1>
    <button class="btn btn-primary me-2" type="button" data-bs-toggle="modal" data-bs-target="#addTicketRequestModal">
      Retirar tickets
    </button>
  </div>
  <hr>
  <AddTicketRequestModal :boards="boards" @request-added="fetchBoards" />
  <BoardsTable :boards="boards" />
</template>