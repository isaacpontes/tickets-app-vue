<script setup>
import Button from './common/Button.vue';
import H2 from '../components/common/H2.vue';
import Input from '../components/common/Input.vue';
import { getSubscribersByLocation, searchSubscriberByName } from '../services/subscribers';
import { useSubscriberStore } from '../stores/subscriber';
import { useLocationStore } from '../stores/location';
import { ref } from 'vue';

const subscriberStore = useSubscriberStore()
const locationStore = useLocationStore()

const emit = defineEmits(['resetLocation'])

const searchName = ref('')

async function handleFilterByLocation(ev) {
  const { locationId } = ev.currentTarget.dataset
  const { id, name } = locationStore.getLocationById(locationId) ?? { id: 0, name: 'Todos' }
  const { subscribers, total } = await getSubscribersByLocation(id)
  subscriberStore.$patch({ subscribers, total, currentLocation: { id, name } })
}

async function handleFilterByName(ev) {
  ev.preventDefault();

  if (searchName.value.length >= 3) {
    const { subscribers, total } = await searchSubscriberByName(searchName.value)
    console.log(subscribers, total)
    subscriberStore.$patch({ subscribers, total })
  }
}

function handleResetLocation() {
  subscriberStore.resetLocation()
  emit("resetLocation")
}
</script>

<template>
  <section class="mb-4">
    <H2>Filtrar</H2>
    <div class="mb-2">
      <Button
        :color="subscriberStore.currentLocation.id === 0 ? 'secondary' : 'light'"
        size="sm"
        class="me-1 mb-1 px-1 py-0"
        :data-location-id="0"
        @click="handleResetLocation"
      >
        Todos
      </Button>
      <Button
        v-for="location in locationStore.locations"
        :color="subscriberStore.currentLocation.id === location.id ? 'secondary' : 'light'"
        size="sm"
        class="me-1 mb-1 px-1 py-0"
        :data-location-id="location.id"
        @click="handleFilterByLocation"
      >
        {{ location.name }}
      </Button>
    </div>
    <form class="d-flex gap-2" @submit="handleFilterByName">
      <Input v-model="searchName" placeholder="Digite um nome para pesquisar..." />
      <Button>Pesquisar</Button>
    </form>
  </section>
</template>