<script setup>
import { onMounted, reactive, ref } from 'vue'
import { api } from '../services/api'
import Alert from './common/Alert.vue'
import Modal from './common/Modal.vue'

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
    <template #header>
      <h5 class="modal-title" id="addTicketRequestModalLabel">Adicionar requisição de tickets</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>
    <form v-on:submit="handleSubmit">
      <div class="modal-body">
        <span class="text-secondary">Adiciona uma requisição de tickets, retirando a quantidade de um local específico na mesa.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantidade de Tickets</label>
          <input v-model="request.quantity" type="number" class="form-control" id="quantity" placeholder="1000"
            required>
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">Data da Requisição</label>
          <input v-model="request.date" type="date" class="form-control" id="date">
        </div>
        <div class="mb-3">
          <label for="subscriberId" class="form-label">Contribuintes</label>
          <select v-model="request.subscriberId" class="form-select" aria-label="Lista de locais" id="subscriberId">
            <option selected value="0" disabled>Selecione um contribuinte...</option>
            <option v-for="subscriber in subscribers" :value="subscriber.id" :key="subscriber.id">
              {{ subscriber.name }} ({{ subscriber.location.name }})
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="boardId" class="form-label">Locais na Mesa</label>
          <select v-model="request.boardId" class="form-select" aria-label="Lista de locais" id="boardId">
            <option selected value="0" disabled>Selecione um local...</option>
            <option v-for="board in boards" :value="board.id" :key="board.id">
              {{ board.location.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="submit" class="btn btn-primary">Salvar Reposição</button>
      </div>
    </form>
  </Modal>
</template>