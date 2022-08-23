<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../services/api'
import { Modal } from 'bootstrap'
import AddSubscriberModal from '../components/AddSubscriberModal.vue'
import SubscribersTable from '../components/SubscribersTable.vue'

const subscribers = ref([])

async function fetchSubscribers() {
  const response = await api.get('/subscribers')
  subscribers.value = response.data
}

function addSubscriber(subscriber) {
  subscribers.value = [...subscribers.value, subscriber]
}

onMounted(() => {
  fetchSubscribers()
})

</script>

<template>
  <div class="d-flex align-items-center">
    <h1 class="me-4">Contribuintes</h1>
    <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#addSubscriberModal">
      Novo contribuinte
    </button>
  </div>
  <hr>
  <add-subscriber-modal :add-subscriber="addSubscriber" />
  <subscribers-table :subscribers="subscribers" />
  <!-- <subscribers-grid :subscribers="subscribers" /> -->
</template>