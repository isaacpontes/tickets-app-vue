<script setup>
import { onMounted, ref } from 'vue'
import BoardsTable from '../components/BoardsTable.vue'
import AddTicketRequestModal from '../components/AddTicketRequestModal.vue';
import { getAll } from '../services/boards';
import Button from '../components/common/Button.vue';

const boards = ref([])

async function fetchBoards() {
  boards.value = await getAll()
}

onMounted(() => {
  fetchBoards()
})

</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Mesa</h1>
    <Button class="me-2" data-bs-toggle="modal" data-bs-target="#addTicketRequestModal">
      Retirar tickets
    </Button>
  </div>
  <hr>
  <AddTicketRequestModal :boards="boards" @request-added="fetchBoards" />
  <BoardsTable :boards="boards" />
</template>