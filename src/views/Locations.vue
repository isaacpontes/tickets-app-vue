<script setup>
import AddLocationModal from '../components/AddLocationModal.vue';
import Button from '../components/common/Button.vue';
import LocationsTable from '../components/LocationsTable.vue';
</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Locais</h1>
    <Button data-bs-toggle="modal" data-bs-target="#addLocationModal">
      Novo local
    </Button>
  </div>
  <hr>
  <AddLocationModal />
  <LocationsTable />
</template>