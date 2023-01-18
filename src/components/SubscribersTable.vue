<script setup>
import { deleteSubscriber } from '../services/subscribers';
import { useSubscriberStore } from '../stores/subscriber';
import calculateAge from '../utils/calculateAge';
import UpdateSubscriberModal from './UpdateSubscriberModal.vue'

const subscriberStore = useSubscriberStore()

async function handleDelete(subscriberId) {
  const confirmation = confirm("Tem certeza que deseja excluir este registro?\n\nATENÇÃO! ESSA É UMA AÇÃO IRREVERSÍVEL.")
  if (!confirmation) return

  try {
    await deleteSubscriber(subscriberId)
    subscriberStore.deleteSubscriber(subscriberId)
  } catch (err) {
    console.error(err.message)
    alert("Erro ao excluir contribuinte.")
  }
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">Idade</th>
        <th scope="col">Local</th>
        <th scope="col">CPF</th>
        <th scope="col">At.</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr class="align-middle" v-for="subscriber in subscriberStore.subscribers">
        <th scope="row">{{ subscriber.id }}</th>
        <td>{{ subscriber.name }}</td>
        <td>{{ calculateAge(new Date(subscriber.birthday)) }}</td>
        <td>{{ subscriber.location?.name }}</td>
        <td>{{ subscriber.document }}</td>
        <td v-if="subscriber.isUpdated">
          <i class="bi bi-check-circle-fill text-success"></i>
        </td>
        <td v-else>
          <i class="bi bi-x-circle-fill text-danger"></i>
        </td>
        <td class="d-flex flex-column flex-md-row">
          <UpdateSubscriberModal :subscriber-to-update="subscriber" />
          <button class="btn btn-sm btn-secondary mb-2 mb-md-0 me-md-2" data-bs-toggle="modal"
            :data-bs-target="`#updateSubscriber${subscriber.id}Modal`">
            <i class="bi bi-pencil-square pe-none me-2"></i>
            Editar
          </button>
          <button class="btn btn-sm btn-danger" @click="() => handleDelete(subscriber.id)">
            <i class="bi bi-trash pe-none me-2"></i>
            Excluir
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>