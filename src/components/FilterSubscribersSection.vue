<script setup>
import Button from './common/Button.vue';
import H2 from '../components/common/H2.vue';
import Input from '../components/common/Input.vue';
import { searchSubscribers } from '../services/subscribers';
import { useSubscriberStore } from '../stores/subscriber';
import { useLocationStore } from '../stores/location';
import { ref } from 'vue';

const subscriberStore = useSubscriberStore()
const locationStore = useLocationStore()

const emit = defineEmits(['resetLocation'])

const name = ref('')
const locationId = ref('')

async function handleSearch(ev) {
  ev.preventDefault()
  const { subscribers, total } = await searchSubscribers({
    name: name.value,
    locationId: locationId.value
  })
  console.log(subscribers, total)
  subscriberStore.$patch({ subscribers, total })
}
</script>

<template>
  <section class="mb-4">
    <H2>Filtrar</H2>
    <div class="mb-2">
      <Button
        :color="locationId === '' ? 'secondary' : 'light'"
        size="sm"
        class="me-1 mb-1 px-1 py-0"
        @click="() => locationId = ''"
      >
        Todos
      </Button>
      <Button
        v-for="location in locationStore.locations"
        :color="locationId === location.id ? 'secondary' : 'light'"
        size="sm"
        class="me-1 mb-1 px-1 py-0"
        @click="() => locationId = location.id"
      >
        {{ location.name }}
      </Button>
    </div>
    <form class="d-flex gap-2" @submit="handleSearch">
      <Input v-model="name" placeholder="Digite um nome para pesquisar..." />
      <Button>Filtrar</Button>
    </form>
  </section>
</template>