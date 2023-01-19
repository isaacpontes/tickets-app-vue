<script setup>
import { onMounted, reactive, ref } from 'vue'
import { api } from '../services/api';
import Alert from './common/Alert.vue'
import Modal from './common/Modal.vue';
import ModalHeader from './common/ModalHeader.vue';
import ModalBody from './common/ModalBody.vue';
import ModalFooter from './common/ModalFooter.vue';
import Label from './common/Label.vue';
import Input from './common/Input.vue';

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
  <Modal id="addSubscriberModal">
    <ModalHeader title="Adicionar novo contruibuinte" />

    <form v-on:submit="handleSubmit">
      <ModalBody>
        <span class="text-secondary">Cadastra as informações de um contribuinte no banco de dados.</span>
        <hr>
        <alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <Label for="name">Nome Completo</Label>
          <Input v-model="subscriber.name" id="name" placeholder="Ex.: João Francisco da Silva" required />
        </div>
        <div class="mb-3">
          <Label for="birthday">Data de Nascimento</Label>
          <Input v-model="subscriber.birthday" type="date" id="birthday" required />
        </div>
        <div class="mb-3">
          <Label for="document">CPF</Label>
          <Input v-model="subscriber.document" id="document" placeholder="Digite somente números" required />
        </div>
        <div class="mb-3 form-check form-switch">
          <input
            v-model="subscriber.isUpdated"
            type="checkbox"
            class="form-check-input"
            role="switch"
            id="isUpdatedSwitch"
          >
          <Label class="form-check-label" for="isUpdatedSwitch">Dados Atualizados?</Label>
        </div>
        <div class="mb-3">
          <Label for="locationsDataList">Local</Label>
          <select v-model="subscriber.locationId" class="form-select" aria-label="Lista de locais">
            <option selected value="0" disabled>Selecione um local...</option>
            <option v-for="location in locations" :value="location.id" :key="location.id">
              {{ location.name }}
            </option>
          </select>
        </div>
      </ModalBody>
      <ModalFooter confirm-button-text="Cadastrar Contruibuinte" />
    </form>
  </Modal>
</template>