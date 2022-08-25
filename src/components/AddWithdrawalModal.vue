<script setup>
import { reactive } from 'vue'
import { api } from '../services/api'
import Alert from './common/Alert.vue'
import Modal from './common/Modal.vue'

const props = defineProps(['inventories'])
const emit = defineEmits(['withdraw'])

const initialWithdrawal = {
  quantity: 0,
  date: '',
  firstTicket: '',
  lastTicket: '',
  observations: '',
  inventoryId: 0
}
const initialAlert = { show: false, message: '', color: 'primary' }

const withdrawal = reactive({ ...initialWithdrawal })
const alert = reactive({ ...initialAlert })

async function handleSubmit(ev) {
  ev.preventDefault()
  try {
    await api.post(`/inventories/${withdrawal.inventoryId}/withdraw`, {
      quantity: withdrawal.quantity,
      date: withdrawal.date,
      firstTicket: withdrawal.firstTicket,
      lastTicket: withdrawal.lastTicket,
      observations: withdrawal.observations
    })
    emit('withdraw')
    Object.assign(withdrawal, initialWithdrawal)
    toggleAlert('Tickets adicionados à mesa com sucesso.', 'success')
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
  <Modal id="addWithdrawalModal">
    <template #header>
      <h5 class="modal-title" id="addWithdrawalModalLabel">Retirar tickets</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>
    <form v-on:submit="handleSubmit">
      <div class="modal-body">
        <span class="text-secondary">Retira tickets do estoque e adiciona-os na mesa.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantidade de Tickets</label>
          <input v-model="withdrawal.quantity" type="number" class="form-control" id="quantity" placeholder="1000"
            required>
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">Data da Retirada</label>
          <input v-model="withdrawal.date" type="date" class="form-control" id="date">
        </div>
        <div class="row mb-3">
          <div class="col col-6">
            <label for="firstTicket" class="form-label">Nº do Primeiro Ticket</label>
            <input v-model="withdrawal.firstTicket" type="text" class="form-control" id="firstTicket"
              placeholder="1001" />
          </div>
          <div class="col col-6">
            <label for="lastTicket" class="form-label">Nº do Último Ticket</label>
            <input v-model="withdrawal.lastTicket" type="text" class="form-control" id="lastTicket"
              placeholder="2000" />
          </div>
        </div>
        <div class="mb-3">
          <label for="observations" class="form-label">Observações</label>
          <textarea v-model="withdrawal.observations" class="form-control" id="observations"></textarea>
        </div>
        <div class="mb-3">
          <label for="inventoriesList" class="form-label">Estoques</label>
          <select v-model="withdrawal.inventoryId" class="form-select" aria-label="Lista de estoques">
            <option selected value="0" disabled>Selecione um estoque...</option>
            <option v-for="inventory in inventories" :value="inventory.id" :key="inventory.id">
              {{ inventory.location.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="submit" class="btn btn-primary">Retirar Tickets</button>
      </div>
    </form>
  </Modal>
</template>