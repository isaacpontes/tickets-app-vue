<script setup>
import DataTable from './common/DataTable.vue';
import DeleteButton from './common/DeleteButton.vue';

defineProps(['boards'])
</script>

<template>
  <DataTable :column-headers="['#', 'Local', 'Talões', 'Tickets', 'Ações']">
    <tr class="align-middle" v-for="board in boards">
      <th scope="row">{{ board.id }}</th>
      <td>{{ board.location?.name }}</td>
      <td>{{ board.tickets / 100 }}</td>
      <td>{{ board.tickets }}</td>
      <td class="d-flex">
        <DeleteButton />
      </td>
    </tr>
  </DataTable>
</template>