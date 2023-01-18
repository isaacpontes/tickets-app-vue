<script setup>
import { onMounted, ref, computed } from 'vue';
import AddSubscriberModal from '../components/AddSubscriberModal.vue'
import SubscribersTable from '../components/SubscribersTable.vue'
import Paginator from '../components/Paginator.vue';
import { getAll } from '../services/locations';
import { getAllSubscribers, getSubscribersByLocation, downloadPdf } from '../services/subscribers';
import { useSubscriberStore } from '../stores/subscriber';
import { useLocationStore } from '../stores/location';

const subscriberStore = useSubscriberStore()
const locationStore = useLocationStore()
const currentPage = ref(1)
const currentLimit = ref(20)

async function fetchLocations() {
  const locations = await getAll()
  locationStore.$patch({ locations: locations })
}

async function fetchSubscribers() {
  if (subscriberStore.currentLocation.id != 0) {
    const { subscribers, total } = await getSubscribersByLocation(
      subscriberStore.currentLocation.id,
      currentPage.value,
      currentLimit.value
    )
    subscriberStore.$patch({ subscribers, total })
  } else {
    const { subscribers, total } = await getAllSubscribers(currentPage.value, currentLimit.value)
    subscriberStore.$patch({ subscribers, total })
  }
}

function handleFilterByLocation(ev) {
  const { locationId } = ev.currentTarget.dataset
  const { id, name } = locationStore.getLocationById(locationId) ?? { id: 0, name: 'Todos' }
  subscriberStore.$patch({ currentLocation: { id, name } })
  fetchSubscribers()
}

function handlePreviousPage() {
  currentPage.value--
  fetchSubscribers()
}

function handleNextPage() {
  currentPage.value++
  fetchSubscribers()
}

function handleChangePageTo(page) {
  currentPage.value = page
  fetchSubscribers()
}

function handleChangeLimit(ev) {
  currentLimit.value = parseFloat(ev.target.value)
  fetchSubscribers()
}

const resultsCountMessage = computed(() => {
  return `Exibindo ${subscriberStore.subscribers.length} de ${subscriberStore.total} contribuintes.`
})

onMounted(() => {
  fetchSubscribers()
  fetchLocations()
})

</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Contribuintes</h1>
    <button class="btn btn-primary me-2" type="button" data-bs-toggle="modal" data-bs-target="#addSubscriberModal">
      Novo contribuinte
    </button>
    <button class="btn btn-secondary" type="button" @click="() => downloadPdf(subscriberStore.subscribers, subscriberStore.currentLocation.name)">
      Exportar como PDF
    </button>
  </div>
  <hr>
  <AddSubscriberModal />
  <section class="mb-4">
    <h2 class="fs-4">Filtrar</h2>
    <div class="mb-2">
      <button
        :class="`btn btn-sm btn-${subscriberStore.currentLocation.id == 0 ? 'secondary' : 'light'} me-2 mb-2`"
        :data-location-id="0"
        @click="handleFilterByLocation"
      >
        Todos
      </button>
      <button
        v-for="location in locationStore.locations"
        :class="`btn btn-sm btn-${location.id === subscriberStore.currentLocation.id ? 'secondary' : 'light'} me-2 mb-2`"
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

  <div class="row mb-3">
    <div class="col col-md-6 py-1">
      {{ resultsCountMessage }}
    </div>
    <div class="col col-md-4 py-1 text-end">
      Contribuintes por página
    </div>
    <div class="col col-md-2">
      <select class="form-select" @change="handleChangeLimit">
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="80">80</option>
        <option value="100">100</option>
        <option value="9999">Todos</option>
      </select>
    </div>
  </div>

  <SubscribersTable />

  <Paginator
    :current-page="currentPage"
    :current-limit="currentLimit"
    :total="subscriberStore.total"
    :handle-previous-page="handlePreviousPage"
    :handle-next-page="handleNextPage"
    :handle-change-page-to="handleChangePageTo"
  />
</template>