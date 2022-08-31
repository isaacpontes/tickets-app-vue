<script setup>
import { onMounted, reactive, ref } from 'vue'
import { api } from '../services/api';
import Alert from './common/Alert.vue'
import Modal from './common/Modal.vue';

const props = defineProps(['subscriberToUpdate', 'locations'])
const emit = defineEmits(['subscriberUpdated'])

const subscriber = reactive({
  ...props.subscriberToUpdate,
  birthday: props.subscriberToUpdate.birthday.replace(/T.+Z$/, '')
})

const initialAlert = { show: false, message: '', color: '' }
const alert = reactive({ ...initialAlert })

async function handleSubmit(ev) {
  ev.preventDefault()
  try {
    await api.put(`/subscribers/${props.subscriberToUpdate.id}`, {
      name: subscriber.name,
      birthday: subscriber.birthday,
      document: subscriber.document,
      isUpdated: subscriber.isUpdated,
      locationId: subscriber.locationId
    })
    toggleAlert('Contribuinte atualizado com sucesso.', 'success')
    emit('subscriberUpdated', subscriber)
  } catch (err) {
    const message = err.response?.data?.message || err.message
    toggleAlert(message, 'danger')
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
</script>

<template>
  <Modal :id="`updateSubscriber${subscriberToUpdate.id}Modal`">
    <template #header>
      <h5 class="modal-title" :id="`updateSubscriber${subscriberToUpdate.id}ModalLabel`">Atualizar contribuinte</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>

    <form v-on:submit="handleSubmit">
      <div class="modal-body">
        <span class="text-secondary">Atualiza as informações de um contribuinte no banco de dados.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
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
          <label for="locations" class="form-label">Local</label>
          <select v-model="subscriber.locationId" id="locations" class="form-select" aria-label="Lista de locais">
            <option v-for="location in locations" :value="location.id" :key="location.id"
              :selected="subscriberToUpdate.location?.id === location.id">
              {{ location.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        <button type="submit" class="btn btn-primary">Salvar</button>
      </div>
    </form>
  </Modal>
</template>