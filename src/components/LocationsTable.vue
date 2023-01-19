<script setup>
import DataTable from './common/DataTable.vue';
import DeleteButton from './common/DeleteButton.vue';

defineProps(['locations'])
</script>

<template>
  <DataTable :column-headers="['#', 'Nome', 'Ações']">
    <tr class="align-middle" v-for="location in locations">
      <th scope="row">{{ location.id }}</th>
      <td>{{ location.name }}</td>
      <td class="d-flex">
        <DeleteButton />
      </td>
    </tr>
  </DataTable>
</template>