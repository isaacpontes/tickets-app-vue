<script setup>
import DataTable from './common/DataTable.vue';
defineProps(['boards'])
const { format } = new Intl.NumberFormat('pt-br')
</script>

<template>
  <DataTable :column-headers="['#', 'Local', 'Talões', 'Tickets']">
    <tr class="align-middle" v-for="board in boards">
      <th scope="row">{{ board.id }}</th>
      <td>{{ board.location?.name }}</td>
      <td>{{ format(board.tickets / 100) }}</td>
      <td>{{ format(board.tickets) }}</td>
    </tr>
  </DataTable>
</template>