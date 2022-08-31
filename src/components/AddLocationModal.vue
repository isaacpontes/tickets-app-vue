<script setup>
import { reactive, ref } from 'vue'
import { api } from '../services/api';
import { createLocation } from '../services/locations';
import Alert from './common/Alert.vue'
import Modal from './common/Modal.vue'
import ModalBody from './common/ModalBody.vue'
import ModalFooter from './common/ModalFooter.vue'

const props = defineProps(['addLocation'])

const locationName = ref('')
const initialState = { show: false, message: '', color: 'primary' }
const alert = reactive({ ...initialState })

async function handleSubmit(ev) {
  ev.preventDefault()
  const data = await createLocation(locationName.value)
  if (data) {
    props.addLocation(data.location)
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
    <template #header>
      <h5 class="modal-title" id="addLocationModalLabel">Adicionar novo local</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>

    <form v-on:submit="handleSubmit">
      <ModalBody>
        <span class="text-secondary">Cria um novo local, seu estoque e sua mesa no banco de dados.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <label for="locationName" class="form-label">Nome do Local</label>
          <input v-model="locationName" type="text" class="form-control" id="locationName" placeholder="Ex.: Centro"
            required>
        </div>
      </ModalBody>
      <ModalFooter>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="submit" class="btn btn-primary">Criar Local</button>
      </ModalFooter>
    </form>
  </Modal>
</template>