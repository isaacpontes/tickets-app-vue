<script setup>
import { reactive } from 'vue'
import { api } from '../services/api'
import Alert from './common/Alert.vue'
import Input from './common/Input.vue'
import Label from './common/Label.vue'
import Modal from './common/Modal.vue'
import ModalBody from './common/ModalBody.vue'
import ModalFooter from './common/ModalFooter.vue'
import ModalHeader from './common/ModalHeader.vue'

const props = defineProps(['inventories'])
const emit = defineEmits(['repositionAdded'])

const initialReposition = { quantity: 0, date: '', observations: '', inventoryId: 0 }
const initialAlert = { show: false, message: '', color: 'primary' }
const reposition = reactive({ ...initialReposition })
const alert = reactive({ ...initialAlert })

async function handleSubmit(ev) {
  ev.preventDefault()
  try {
    await api.post(`/inventories/${reposition.inventoryId}/add-reposition`, {
      quantity: reposition.quantity,
      date: reposition.date,
      observations: reposition.observations
    })
    emit('repositionAdded')
    Object.assign(reposition, initialReposition)
    toggleAlert('Tickets adicionados ao estoque com sucesso.', 'success')
  } catch (err) {
    toggleAlert(err.response.data.message, 'danger')
  }
}

function toggleAlert(message, color = 'primary') {
  alert.color = color
  alert.message = message
  alert.show = !alert.show
  setTimeout(() => {
    Object.assign(alert, initialAlert)
  }, 1000 * 5)
}
</script>

<template>
  <Modal id="addRepositionModal">
    <ModalHeader title="Adicionar tickets" />

    <form v-on:submit="handleSubmit">
      <ModalBody>
        <span class="text-secondary">Adiciona uma reposição de tickets ao estoque.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <Label for="quantity">Quantidade de Tickets</Label>
          <Input v-model="reposition.quantity" type="number" id="quantity" placeholder="1000" required />
        </div>
        <div class="mb-3">
          <Label for="date">Data da Reposição</Label>
          <Input v-model="reposition.date" type="date" id="date" />
        </div>
        <div class="mb-3">
          <Label for="observations">Observações</Label>
          <textarea v-model="reposition.observations" id="observations"></textarea>
        </div>
        <div class="mb-3">
          <Label for="inventoriesList">Estoques</Label>
          <select v-model="reposition.inventoryId" class="form-select" aria-label="Lista de estoques">
            <option selected value="0" disabled>Selecione um estoque...</option>
            <option v-for="inventory in inventories" :value="inventory.id" :key="inventory.id">
              {{ inventory.location.name }}
            </option>
          </select>
        </div>
      </ModalBody>
      <ModalFooter confirm-button-text="Adicionar Reposição" />
    </form>
  </Modal>
</template>