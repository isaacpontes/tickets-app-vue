<script setup>
import { onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'
// import LocationsGrid from '../components/LocationsGrid.vue'
import AddLocationModal from '../components/AddLocationModal.vue';
import LocationsTable from '../components/LocationsTable.vue';
import { fetchAllLocations } from '../services/locations';

const locations = ref([])

function addLocation(location) {
  locations.value = [...locations.value, location]
}

onMounted(() => {
  fetchAllLocations().then(data => locations.value = data)
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
  <AddLocationModal :add-location="addLocation" />
  <LocationsTable :locations="locations" />
  <!-- <locations-grid :locations="locations" /> -->
</template>