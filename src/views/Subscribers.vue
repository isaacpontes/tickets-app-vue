<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import AddSubscriberModal from '../components/AddSubscriberModal.vue'
import SubscribersTable from '../components/SubscribersTable.vue'
import Paginator from '../components/Paginator.vue';
import { getAll } from '../services/locations';
import { downloadPdf, searchSubscribers } from '../services/subscribers';
import { useSubscriberStore } from '../stores/subscriber';
import { useLocationStore } from '../stores/location';
import Button from '../components/common/Button.vue';
import FilterSubscribersSection from '../components/FilterSubscribersSection.vue';
import PageQuantitySelector from '../components/PageQuantitySelector.vue';

const subscriberStore = useSubscriberStore()
const locationStore = useLocationStore()

async function fetchLocations() {
  const locations = await getAll()
  locationStore.$patch({ locations: locations })
}

async function fetchSubscribers() {
  const { subscribers, total } = await searchSubscribers({
    name: subscriberStore.currentSearchName,
    locationId: subscriberStore.currentLocation.id || ''
  },
    subscriberStore.currentPage,
    subscriberStore.currentLimit
  )
  subscriberStore.$patch({ subscribers, total })
}

function incrementPage() {
  subscriberStore.incrementPage()
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

function decrementPage() {
  subscriberStore.decrementPage()
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

function changePageTo(newPage) {
  subscriberStore.$patch({ currentPage: newPage })
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

watchEffect(fetchSubscribers)

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
    <Button
      color="secondary"
      @click="() => downloadPdf(subscriberStore.subscribers, subscriberStore.currentLocation.name)"
    >
      Exportar como PDF
    </Button>
  </div>

  <hr>

  <AddSubscriberModal />

  <FilterSubscribersSection @reset-location="fetchSubscribers" />

  <PageQuantitySelector
    :shown="subscriberStore.subscribers.length"
    :total="subscriberStore.total"
    label="usuários"
    @limit-change="(newLimit) => subscriberStore.$patch({ currentLimit: newLimit })"
  />

  <SubscribersTable />

  <Paginator
    :current-page="subscriberStore.currentPage"
    :current-limit="subscriberStore.currentLimit"
    :total="subscriberStore.total"
    @page-increment="incrementPage"
    @page-decrement="decrementPage"
    @page-change="(newPage) => changePageTo(newPage)"
  />
</template>