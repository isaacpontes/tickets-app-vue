<script setup>
import { onMounted, ref } from 'vue'
import AddLocationModal from '../components/AddLocationModal.vue';
import Button from '../components/common/Button.vue';
import LocationsTable from '../components/LocationsTable.vue';
import { getAll } from '../services/locations';

const locations = ref([])

function addLocation(location) {
  locations.value = [...locations.value, location]
}

async function fetchLocations() {
  locations.value = await getAll()
}

onMounted(() => {
  fetchLocations()
})
</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Locais</h1>
    <Button data-bs-toggle="modal" data-bs-target="#addLocationModal">
      Novo local
    </Button>
  </div>
  <hr>
  <AddLocationModal :add-location="addLocation" />
  <LocationsTable :locations="locations" />
</template>