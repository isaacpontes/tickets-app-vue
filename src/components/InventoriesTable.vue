<script setup>
defineProps(['inventories'])
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Local</th>
        <th scope="col">Talões</th>
        <th scope="col">Tickets</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr class="align-middle" v-for="inventory in inventories">
        <th scope="row">{{ inventory.id }}</th>
        <td>{{ inventory.location?.name }}</td>
        <td>{{ inventory.tickets / 100 }}</td>
        <td>{{ inventory.tickets }}</td>
        <td class="d-flex">
          <button class="btn btn-sm btn-danger">
            <i class="bi bi-trash pe-none me-2"></i>
            Excluir
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>