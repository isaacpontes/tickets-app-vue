<script setup>
import DataTable from './common/DataTable.vue';
defineProps(['inventories'])
const { format } = new Intl.NumberFormat('pt-br')
</script>

<template>
  <DataTable :column-headers="['#', 'Local', 'Talões', 'Tickets']">
    <tr class="align-middle" v-for="inventory in inventories">
      <th scope="row">{{ inventory.id }}</th>
      <td>{{ inventory.location?.name }}</td>
      <td>{{ format(inventory.tickets / 100) }}</td>
      <td>{{ format(inventory.tickets) }}</td>
    </tr>
  </DataTable>
</template>