<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import AddSubscriberModal from '../components/AddSubscriberModal.vue'
import SubscribersTable from '../components/SubscribersTable.vue'
import Paginator from '../components/Paginator.vue';
import { getAll } from '../services/locations';
import { getAllSubscribers, downloadPdf } from '../services/subscribers';
import { useSubscriberStore } from '../stores/subscriber';
import { useLocationStore } from '../stores/location';
import Button from '../components/common/Button.vue';
import FilterSubscribersSection from '../components/FilterSubscribersSection.vue';
import PageQuantitySelector from '../components/PageQuantitySelector.vue';

const subscriberStore = useSubscriberStore()
const locationStore = useLocationStore()
const currentPage = ref(1)
const currentLimit = ref(4)

async function fetchLocations() {
  const locations = await getAll()
  locationStore.$patch({ locations: locations })
}

async function fetchSubscribers() {
  const { subscribers, total } = await getAllSubscribers(currentPage.value, currentLimit.value)
  subscriberStore.$patch({ subscribers, total })
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
    @limit-change="(newLimit) => currentLimit = newLimit"
  />

  <SubscribersTable />

  <Paginator
    :current-page="currentPage"
    :current-limit="currentLimit"
    :total="subscriberStore.total"
    @page-increment="() => currentPage++"
    @page-decrement="() => currentPage--"
    @page-change="(newPage) => currentPage = newPage"
  />
</template>