<script setup>
import { reactive, ref } from 'vue'
import { createLocation } from '../services/locations';
import { useLocationStore } from '../stores/location';
import Alert from './common/Alert.vue'
import Input from './common/Input.vue';
import Label from './common/Label.vue';
import Modal from './common/Modal.vue'
import ModalBody from './common/ModalBody.vue'
import ModalFooter from './common/ModalFooter.vue'
import ModalHeader from './common/ModalHeader.vue';

const locationStore = useLocationStore()

const locationName = ref('')
const initialState = { show: false, message: '', color: 'primary' }
const alert = reactive({ ...initialState })

async function handleSubmit(ev) {
  ev.preventDefault()
  const data = await createLocation(locationName.value)
  if (data) {
    locationStore.addLocation(data.location)
    locationName.value = ''
    toggleAlert('Local criado com sucesso.', 'success')
  }
}

function toggleAlert(message, color = 'primary') {
  alert.color = color
  alert.message = message
  alert.show = !alert.show
  setTimeout(() => {
    Object.assign(alert, initialState)
  }, 1000 * 3)
}
</script>

<template>
  <Modal id="addLocationModal">
    <ModalHeader title="Adicionar novo local" />

    <form v-on:submit="handleSubmit">
      <ModalBody>
        <span class="text-secondary">Cria um novo local, seu estoque e sua mesa no banco de dados.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <Label for="locationName">Nome do Local</Label>
          <Input v-model="locationName" id="locationName" placeholder="Ex.: Centro" required />
        </div>
      </ModalBody>
      <ModalFooter confirm-button-text="Criar Local" />
    </form>
  </Modal>
</template>