<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../services/api'
import { Modal } from 'bootstrap'
import LocationsGrid from '../components/LocationsGrid.vue';
import AddLocationModal from '../components/AddLocationModal.vue';
import LocationsTable from '../components/LocationsTable.vue';

const locations = ref([])

async function fetchLocations() {
  const response = await api.get('/locations')
  locations.value = response.data
}

function addLocation(location) {
  locations.value = [...locations.value, location]
}

onMounted(() => {
  fetchLocations()
})

</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Locais</h1>
    <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addLocationModal">
      Novo local
    </button>
  </div>
  <hr>
  <add-location-modal :add-location="addLocation" />
  <LocationsTable :locations="locations" />
  <!-- <locations-grid :locations="locations" /> -->
</template>