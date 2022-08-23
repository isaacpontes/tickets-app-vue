<script setup>
import { onMounted, reactive, ref } from 'vue'
import { api } from '../services/api';
import Alert from './Alert.vue';

const props = defineProps(['addSubscriber'])

const initialSubscriber = { name: '', birthday: '', document: '', locationId: 0, isUpdated: true }
const initialAlert = { show: false, message: '', color: 'primary' }
const subscriber = reactive({ ...initialSubscriber })
const alert = reactive({ ...initialAlert })
const locations = ref([])

async function handleSubmit(ev) {
  ev.preventDefault()
  try {
    const response = await api.post('/subscribers', {
      name: subscriber.name,
      birthday: subscriber.birthday,
      document: subscriber.document,
      isUpdated: subscriber.isUpdated,
      locationId: subscriber.locationId
    })
    props.addSubscriber(response.data)
    Object.assign(subscriber, initialSubscriber)
    toggleAlert('Contribuinte cadastrado com sucesso.', 'success')
  } catch (err) {
    console.log(err)
    toggleAlert(err.response.data.message, 'danger')
  }
}

function toggleAlert(message, color = 'primary') {
  alert.color = color
  alert.message = message
  alert.show = !alert.show
  setTimeout(() => {
    Object.assign(alert, initialAlert)
  }, 1000 * 3)
}

async function fetchLocations() {
  const response = await api.get('/locations')
  locations.value = response.data
}

onMounted(() => {
  fetchLocations()
})
</script>

<template>
  <div class="modal fade" id="addSubscriberModal" tabindex="-1" aria-labelledby="addSubscriberModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addSubscriberModalLabel">Adicionar novo contribuinte</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form v-on:submit="handleSubmit">
          <div class="modal-body">
            <span class="text-secondary">Cadastra as informações de um contribuinte no banco de dados.</span>
            <hr>
            <alert :show="alert.show" :color="alert.color" :message="alert.message" />
            <div class="mb-3">
              <label for="name" class="form-label">Nome Completo</label>
              <input v-model="subscriber.name" type="text" class="form-control" id="name"
                placeholder="Ex.: João Francisco da Silva" required>
            </div>
            <div class="mb-3">
              <label for="birthday" class="form-label">Data de Nascimento</label>
              <input v-model="subscriber.birthday" type="date" class="form-control" id="birthday" required>
            </div>
            <div class="mb-3">
              <label for="document" class="form-label">CPF</label>
              <input v-model="subscriber.document" type="text" class="form-control" id="document"
                placeholder="Digite somente números" required>
            </div>
            <div class="mb-3 form-check form-switch">
              <input v-model="subscriber.isUpdated" type="checkbox" class="form-check-input" role="switch"
                id="isUpdatedSwitch">
              <label class="form-check-label" for="isUpdatedSwitch">Dados Atualizados?</label>
            </div>
            <div class="mb-3">
              <label for="locationsDataList" class="form-label">Local</label>
              <select v-model="subscriber.locationId" class="form-select" aria-label="Lista de locais">
                <option selected value="0" disabled>Selecione um local...</option>
                <option v-for="location in locations" :value="location.id" :key="location.id">
                  {{ location.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="submit" class="btn btn-primary">Cadastrar Contribuinte</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>