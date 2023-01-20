<script setup>
import { onMounted, ref, computed } from 'vue';
import AddSubscriberModal from '../components/AddSubscriberModal.vue'
import SubscribersTable from '../components/SubscribersTable.vue'
import Paginator from '../components/Paginator.vue';
import { getAll } from '../services/locations';
import { getAllSubscribers, downloadPdf } from '../services/subscribers';
import { useSubscriberStore } from '../stores/subscriber';
import { useLocationStore } from '../stores/location';
import Button from '../components/common/Button.vue';
import FilterSubscribersSection from '../components/FilterSubscribersSection.vue';

const subscriberStore = useSubscriberStore()
const locationStore = useLocationStore()
const currentPage = ref(1)
const currentLimit = ref(20)

async function fetchLocations() {
  const locations = await getAll()
  locationStore.$patch({ locations: locations })
}

async function fetchSubscribers() {
  const { subscribers, total } = await getAllSubscribers(currentPage.value, currentLimit.value)
  subscriberStore.$patch({ subscribers, total })
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
    <Button class="me-2" data-bs-toggle="modal" data-bs-target="#addSubscriberModal">
      Novo contribuinte
    </Button>
    <Button color="secondary" @click="() => downloadPdf(subscriberStore.subscribers, subscriberStore.currentLocation.name)">
      Exportar como PDF
    </Button>
  </div>
  <hr>
  <AddSubscriberModal />
  <FilterSubscribersSection @reset-location="fetchSubscribers" />

  <div class="row mb-3">
    <div class="col col-md-6 py-1">
      {{ resultsCountMessage }}
    </div>
    <div class="col col-md-4 text-end">
      Contribuintes por página
    </div>
    <div class="col col-md-2">
      <select class="form-select form-select-sm" @change="handleChangeLimit">
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