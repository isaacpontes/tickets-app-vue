<script setup>
import { onMounted, reactive, ref } from 'vue'
import { api } from '../services/api'
import Alert from './common/Alert.vue'
import Input from './common/Input.vue';
import Label from './common/Label.vue';
import Modal from './common/Modal.vue'
import ModalFooter from './common/ModalFooter.vue';
import ModalHeader from './common/ModalHeader.vue';

const props = defineProps(['boards'])
const emit = defineEmits(['requestAdded'])

const initialRequest = { quantity: 0, date: '', observations: '', subscriberId: 0, boardId: 0 }
const initialAlert = { show: false, message: '', color: 'primary' }

const request = reactive({ ...initialRequest })
const alert = reactive({ ...initialAlert })
const subscribers = ref([])

onMounted(() => {
  fetchActiveSubscribers()
})

async function fetchActiveSubscribers() {
  const { data } = await api.get('/subscribers?limit=99999')
  subscribers.value = data.subscribers
}

async function handleSubmit(ev) {
  ev.preventDefault()
  try {
    await api.post(`/boards/${request.boardId}/add-request`, {
      quantity: request.quantity,
      date: request.date,
      subscriberId: request.subscriberId
    })
    emit('requestAdded')
    Object.assign(request, initialRequest)
    toggleAlert('Tickets removidos da mesa com sucesso.', 'success')
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
  <Modal id="addTicketRequestModal">
    <ModalHeader title="Adicionar requisição de tickets" />

    <form v-on:submit="handleSubmit">
      <div class="modal-body">
        <span class="text-secondary">Adiciona uma requisição de tickets, retirando a quantidade de um local específico na mesa.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <Label for="quantity">Quantidade de Tickets</Label>
          <Input v-model="request.quantity" type="number" id="quantity" placeholder="1000" required />
        </div>
        <div class="mb-3">
          <Label for="date">Data da Requisição</Label>
          <Input v-model="request.date" type="date" id="date"/>
        </div>
        <div class="mb-3">
          <Label for="subscriberId">Contribuintes</Label>
          <select v-model="request.subscriberId" class="form-select" aria-label="Lista de locais" id="subscriberId">
            <option selected value="0" disabled>Selecione um contribuinte...</option>
            <option v-for="subscriber in subscribers" :value="subscriber.id" :key="subscriber.id">
              {{ subscriber.name }} ({{ subscriber.location.name }})
            </option>
          </select>
        </div>
        <div class="mb-3">
          <Label for="boardId">Locais na Mesa</Label>
          <select v-model="request.boardId" class="form-select" aria-label="Lista de locais" id="boardId">
            <option selected value="0" disabled>Selecione um local...</option>
            <option v-for="board in boards" :value="board.id" :key="board.id">
              {{ board.location.name }}
            </option>
          </select>
        </div>
      </div>
      <ModalFooter confirm-button-text="Salvar Reposição"/>
    </form>
  </Modal>
</template>