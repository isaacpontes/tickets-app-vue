<script setup>
defineProps(['boards'])
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
      <tr class="align-middle" v-for="board in boards">
        <th scope="row">{{ board.id }}</th>
        <td>{{ board.location?.name }}</td>
        <td>{{ board.tickets / 100 }}</td>
        <td>{{ board.tickets }}</td>
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