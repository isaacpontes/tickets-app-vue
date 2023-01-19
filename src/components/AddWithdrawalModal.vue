<script setup>
import { reactive } from 'vue'
import { api } from '../services/api'
import Alert from './common/Alert.vue'
import Input from './common/Input.vue';
import Label from './common/Label.vue';
import Modal from './common/Modal.vue'
import ModalFooter from './common/ModalFooter.vue';
import ModalHeader from './common/ModalHeader.vue';

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
    <ModalHeader title="Retirar tickets" />

    <form v-on:submit="handleSubmit">
      <div class="modal-body">
        <span class="text-secondary">Retira tickets do estoque e adiciona-os na mesa.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <Label for="quantity">Quantidade de Tickets</Label>
          <Input id="quantity" type="number" placeholder="1000" required v-model="withdrawal.quantity" />
        </div>
        <div class="mb-3">
          <Label for="date">Data da Retirada</Label>
          <Input id="date" type="date" v-model="withdrawal.date" />
        </div>
        <div class="row mb-3">
          <div class="col col-6">
            <Label for="firstTicket">Nº do Primeiro Ticket</Label>
            <Input id="firstTicket" placeholder="1001" v-model="withdrawal.firstTicket" />
          </div>
          <div class="col col-6">
            <Label for="lastTicket">Nº do Último Ticket</Label>
            <Input id="lastTicket" placeholder="2000" v-model="withdrawal.lastTicket" />
          </div>
        </div>
        <div class="mb-3">
          <Label for="observations">Observações</Label>
          <textarea v-model="withdrawal.observations" class="form-control" id="observations"></textarea>
        </div>
        <div class="mb-3">
          <Label for="inventoriesList">Estoques</Label>
          <select v-model="withdrawal.inventoryId" class="form-select" aria-label="Lista de estoques">
            <option selected value="0" disabled>Selecione um estoque...</option>
            <option
              v-for="inventory in inventories"
              :value="inventory.id"
              :key="inventory.id"
            >
              {{ inventory.location.name }}
            </option>
          </select>
        </div>
      </div>
      <ModalFooter confirm-button-text="Retirar Tickets"/>
    </form>
  </Modal>
</template>