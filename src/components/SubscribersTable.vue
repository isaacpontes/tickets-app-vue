<script setup>
import { Modal } from 'bootstrap'
import UpdateSubscriberModal from './UpdateSubscriberModal.vue'

defineProps(['subscribers'])
const emit = defineEmits(['updateSubscriber'])

function handleUpdate(updatedSubscriber) {
  const modalElement = document.querySelector(`#updateSubscriber${updatedSubscriber.id}Modal`)
  Modal.getInstance(modalElement).hide()
  emit('updateSubscriber', updatedSubscriber)
}
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
        <td class="d-flex flex-column flex-md-row">
          <UpdateSubscriberModal :subscriber-to-update="subscriber" @subscriber-updated="handleUpdate" />
          <button class="btn btn-sm btn-secondary mb-2 mb-md-0 me-md-2" data-bs-toggle="modal"
            :data-bs-target="`#updateSubscriber${subscriber.id}Modal`">
            <i class="bi bi-pencil-square pe-none me-2"></i>
            Editar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>