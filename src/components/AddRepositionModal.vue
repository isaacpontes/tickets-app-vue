<script setup>
import { reactive } from 'vue'
import { api } from '../services/api'
import Alert from './Alert.vue'
import Modal from './common/Modal.vue'

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
    <template #header>
      <h5 class="modal-title" id="addRepositionModalLabel">Adicionar tickets</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>
    <form v-on:submit="handleSubmit">
      <div class="modal-body">
        <span class="text-secondary">Adiciona uma reposição de tickets ao estoque.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantidade de Tickets</label>
          <input v-model="reposition.quantity" type="number" class="form-control" id="quantity" placeholder="1000"
            required>
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">Data da Reposição</label>
          <input v-model="reposition.date" type="date" class="form-control" id="date">
        </div>
        <div class="mb-3">
          <label for="observations" class="form-label">Observações</label>
          <textarea v-model="reposition.observations" class="form-control" id="observations"></textarea>
        </div>
        <div class="mb-3">
          <label for="inventoriesList" class="form-label">Estoques</label>
          <select v-model="reposition.inventoryId" class="form-select" aria-label="Lista de estoques">
            <option selected value="0" disabled>Selecione um estoque...</option>
            <option v-for="inventory in inventories" :value="inventory.id" :key="inventory.id">
              {{ inventory.location.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="submit" class="btn btn-primary">Adicionar Reposição</button>
      </div>
    </form>
  </Modal>
</template>