<script setup>
defineProps(['subscribers'])
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">Local</th>
        <th scope="col">CPF</th>
        <th scope="col">Atualizado?</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr class="align-middle" v-for="subscriber in subscribers">
        <th scope="row">{{ subscriber.id }}</th>
        <td>{{ subscriber.name }}</td>
        <td>{{ subscriber.location?.name }}</td>
        <td>{{ subscriber.document }}</td>
        <td v-if="subscriber.isUpdated">
          <i class="bi bi-check-circle-fill text-success"></i>
        </td>
        <td v-else>
          <i class="bi bi-x-circle-fill text-danger"></i>
        </td>
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