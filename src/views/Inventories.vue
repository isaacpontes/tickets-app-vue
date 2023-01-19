<script setup>
import { onMounted, ref } from 'vue'
import InventoriesTable from '../components/InventoriesTable.vue'
import AddRepositionModal from '../components/AddRepositionModal.vue';
import AddWithdrawalModal from '../components/AddWithdrawalModal.vue';
import { getAll } from '../services/inventories';
import Button from '../components/common/Button.vue';

const inventories = ref([])

async function fetchInventories() {
  inventories.value = await getAll()
}

onMounted(() => {
  fetchInventories()
})

</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Estoques</h1>
    <Button class=" me-2" data-bs-toggle="modal" data-bs-target="#addWithdrawalModal">
      Retirar tickets
    </Button>
    <Button color="secondary" data-bs-toggle="modal" data-bs-target="#addRepositionModal">
      Adicionar tickets
    </Button>
  </div>
  <hr>
  <AddWithdrawalModal
    :inventories="inventories"
    @withdraw="fetchInventories"
  />
  <AddRepositionModal
    :inventories="inventories"
    @reposition-added="fetchInventories"
  />
  <InventoriesTable :inventories="inventories" />
</template>