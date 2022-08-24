<script setup>
import { onMounted, ref } from 'vue'
import { api } from '../services/api'
import InventoriesTable from '../components/InventoriesTable.vue'
import AddRepositionModal from '../components/AddRepositionModal.vue';
import AddWithdrawalModal from '../components/AddWithdrawalModal.vue';

const inventories = ref([])

async function fetchInventories() {
  const response = await api.get('/inventories')
  inventories.value = response.data
}

onMounted(() => {
  fetchInventories()
})

</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Estoques</h1>
    <button class="btn btn-primary me-2" type="button" data-bs-toggle="modal" data-bs-target="#addWithdrawalModal">
      Retirar tickets
    </button>
    <button class="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#addRepositionModal">
      Adicionar tickets
    </button>
  </div>
  <hr>
  <AddWithdrawalModal :inventories="inventories" @withdraw="fetchInventories" />
  <AddRepositionModal :inventories="inventories" @reposition-added="fetchInventories()" />
  <InventoriesTable :inventories="inventories" />
</template>