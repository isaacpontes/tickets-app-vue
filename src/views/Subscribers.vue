<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../services/api'
import AddSubscriberModal from '../components/AddSubscriberModal.vue'
import SubscribersTable from '../components/SubscribersTable.vue'
import { downloadPdf } from '../services/subscribers'

const subscribers = ref([])
const filteredSubscribers = ref(null)
const locations = ref([])
const locationId = ref(0)

async function fetchLocations() {
  const response = await api.get('/locations')
  locations.value = response.data
}

async function fetchSubscribers(locationId) {
  let response
  if (locationId != 0) {
    response = await api.get(`/subscribers?locationId=${locationId}`)
  } else {
    response = await api.get('/subscribers')
  }
  subscribers.value = response.data
}

function addSubscriber(subscriber) {
  subscribers.value = [...subscribers.value, subscriber]
}

function updateSubscriber(subscriber) {
  const updatedSubscribers = subscribers.value.map(sub => sub.id === subscriber.id ? subscriber : sub)
  subscribers.value = updatedSubscribers
}

function deleteSubscriber(subscriberId) {
  const updatedSubscribers = subscribers.value.filter(subscriber => subscriber.id !== subscriberId)
  subscribers.value = updatedSubscribers
}

function handleFilterByLocation(ev) {
  locationId.value = ev.currentTarget.dataset.locationId
  fetchSubscribers(ev.currentTarget.dataset.locationId)
}

function handleFilterByName(ev) {
  const name = ev.currentTarget.value
  if (name.length >= 3) {
    filteredSubscribers.value = subscribers.value.filter(sub => sub.name.match(new RegExp(name, 'gi')))
  } else {
    filteredSubscribers.value = null
  }
}

function handleDownload() {
  let location = 'Todos'
  if (locationId.value != 0) {
    location = locations.value.find(l => l.id == locationId.value)?.name
  }
  downloadPdf(subscribers.value, location)
}

onMounted(() => {
  fetchSubscribers(0)
  fetchLocations()
})

</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Contribuintes</h1>
    <button class="btn btn-primary me-2" type="button" data-bs-toggle="modal" data-bs-target="#addSubscriberModal">
      Novo contribuinte
    </button>
    <button class="btn btn-secondary" type="button" @click="handleDownload">
      Exportar como PDF
    </button>
  </div>
  <hr>
  <AddSubscriberModal :add-subscriber="addSubscriber" />
  <section class="mb-4">
    <h2 class="fs-4">Filtrar</h2>
    <div class="mb-2">
      <button
        :class="`btn btn-sm btn-${locationId == 0 ? 'secondary' : 'light'} me-2`"
        data-location-id="0"
        @click="handleFilterByLocation"
      >
        Todos
      </button>
      <button
        v-for="location in locations"
        :class="`btn btn-sm btn-${location.id == locationId ? 'secondary' : 'light'} me-2`"
        :data-location-id="location.id"
        @click="handleFilterByLocation"
      >
        {{ location.name }}
      </button>
    </div>
    <div>
      <input @keyup="handleFilterByName" type="text" class="form-control" placeholder="Digite um nome para pesquisar...">
    </div>
  </section>
  <SubscribersTable :subscribers="filteredSubscribers ?? subscribers" @update-subscriber="updateSubscriber"
    @delete-subscriber="deleteSubscriber" />
</template>