<script setup>
import { reactive } from 'vue'
import { updateSubscriber } from '../services/subscribers';
import { useLocationStore } from '../stores/location';
import { useSubscriberStore } from '../stores/subscriber';
import Alert from './common/Alert.vue'
import Modal from './common/Modal.vue';
import Label from './common/Label.vue';
import Input from './common/Input.vue';
import ModalHeader from './common/ModalHeader.vue';
import ModalFooter from './common/ModalFooter.vue';

const subscriberStore = useSubscriberStore()
const locationStore = useLocationStore()

const props = defineProps(['subscriberToUpdate'])

const subscriber = reactive({
  ...props.subscriberToUpdate,
  birthday: props.subscriberToUpdate.birthday.replace(/T.+Z$/, '')
})

const initialAlert = { show: false, message: '', color: '' }
const alert = reactive({ ...initialAlert })

async function handleSubmit(ev) {
  ev.preventDefault()
  try {
    await updateSubscriber(subscriber)
    subscriberStore.updateSubscriber(subscriber)
    toggleAlert('Contribuinte atualizado com sucesso.', 'success')
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
    <ModalHeader title="Atualizar contribuinte" />

    <form v-on:submit="handleSubmit">
      <div class="modal-body">
        <span class="text-secondary">Atualiza as informações de um contribuinte no banco de dados.</span>
        <hr>
        <Alert :show="alert.show" :color="alert.color" :message="alert.message" />
        <div class="mb-3">
          <Label for="name">Nome Completo</Label>
          <Input
            id="name"
            v-model="subscriber.name"
            placeholder="Ex.: João Francisco da Silva"
            required
          />
        </div>
        <div class="mb-3">
          <Label for="birthday">Data de Nascimento</Label>
          <Input
            id="birthday"
            type="date"
            v-model="subscriber.birthday"
            required
          />
        </div>
        <div class="mb-3">
          <Label for="document">CPF</Label>
          <Input
            id="document"
            v-model="subscriber.document"
            placeholder="Digite somente números"
            required
          />
        </div>
        <div class="mb-3 form-check form-switch">
          <input
            v-model="subscriber.isUpdated"
            type="checkbox"
            class="form-check-input"
            role="switch"
            id="isUpdatedSwitch"
          />
          <Label class="form-check-label" for="isUpdatedSwitch">Dados Atualizados?</Label>
        </div>
        <div class="mb-3">
          <Label for="locations">Local</Label>
          <select
            id="locations"
            class="form-select"
            aria-label="Lista de locais"
            v-model="subscriber.locationId"
          >
            <option
              v-for="location in locationStore.locations"
              :value="location.id"
              :key="location.id"
              :selected="subscriberToUpdate.location?.id === location.id"
            >
              {{ location.name }}
            </option>
          </select>
        </div>
      </div>
      <ModalFooter confirm-button-text="Salvar" />
    </form>
  </Modal>
</template>