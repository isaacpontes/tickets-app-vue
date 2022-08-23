<script setup>
defineProps(['locations'])
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr class="align-middle" v-for="location in locations">
        <th scope="row">{{ location.id }}</th>
        <td>{{ location.name }}</td>
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