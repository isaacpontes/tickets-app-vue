<script setup>
import { onMounted } from 'vue';
import { deleteLocation, getAll } from '../services/locations';
import { useLocationStore } from '../stores/location';
import DataTable from './common/DataTable.vue';
import DeleteButton from './common/DeleteButton.vue';

defineProps(['locations'])

const locationStore = useLocationStore()

async function fetchLocations() {
  const locations = await getAll()
  locationStore.$patch({ locations: locations })
}

async function handleDelete(locationId) {
  const confirmation = confirm("Tem certeza que deseja excluir esta localidade?\nObs.: É preciso que não haja nenhum registro associado a essa localidade para exclui-la.\n\nATENÇÃO! ESSA É UMA AÇÃO IRREVERSÍVEL.")
  if (!confirmation) return

  try {
    await deleteLocation(locationId)
    locationStore.deleteLocation(locationId)
  } catch (err) {
    console.error(err.message)
  }
}

onMounted(() => {
  fetchLocations()
})
</script>

<template>
  <DataTable :column-headers="['#', 'Nome', 'Ações']">
    <tr class="align-middle" v-for="location in locationStore.locations">
      <th scope="row">{{ location.id }}</th>
      <td>{{ location.name }}</td>
      <td class="d-flex">
        <DeleteButton @click="() => handleDelete(location.id)" />
      </td>
    </tr>
  </DataTable>
</template>