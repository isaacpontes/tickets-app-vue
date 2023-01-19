<script setup>
import DataTable from './common/DataTable.vue';
import DeleteButton from './common/DeleteButton.vue';

defineProps(['inventories'])
</script>

<template>
  <DataTable :column-headers="['#', 'Local', 'Talões', 'Tickets', 'Ações']">
    <tr class="align-middle" v-for="inventory in inventories">
      <th scope="row">{{ inventory.id }}</th>
      <td>{{ inventory.location?.name }}</td>
      <td>{{ inventory.tickets / 100 }}</td>
      <td>{{ inventory.tickets }}</td>
      <td class="d-flex">
        <DeleteButton />
      </td>
    </tr>
  </DataTable>
</template>