<script setup>
import { ref } from 'vue'
import { Modal } from 'bootstrap'
import { deleteSubscriber } from '../services/subscribers';
import { useSubscriberStore } from '../stores/subscriber';
import calculateAge from '../utils/calculateAge';
import CircleCheck from './common/CircleCheck.vue';
import DataTable from './common/DataTable.vue';
import DeleteButton from './common/DeleteButton.vue';
import EditButton from './common/EditButton.vue';
import EditSubscriberModal from './EditSubscriberModal.vue'

const subscriberStore = useSubscriberStore()
const subscriberToUpdate = ref(null)

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

function toggleModal(subscriber) {
  subscriberToUpdate.value = subscriber
  const editModal = new Modal('#editSubscriberModal')
  console.log(editModal)
  editModal.show()
}
</script>

<template>
  <DataTable :column-headers="['#', 'Nome', 'Idade', 'Local', 'CPF', 'At.', 'Ações']">
    <tr class="align-middle" v-for="subscriber in subscriberStore.subscribers">
      <th scope="row">{{ subscriber.id }}</th>
      <td>{{ subscriber.name }}</td>
      <td>{{ calculateAge(new Date(subscriber.birthday)) }}</td>
      <td>{{ subscriber.location?.name }}</td>
      <td>{{ subscriber.document }}</td>
      <td><CircleCheck :is-checked="subscriber.isUpdated" /></td>
      <td class="d-flex flex-column flex-md-row">
        <EditButton @click="() => toggleModal(subscriber)" />
        <DeleteButton @click="() => handleDelete(subscriber.id)" />
      </td>
    </tr>
  </DataTable>
  <EditSubscriberModal :subscriber="subscriberToUpdate" />
</template>