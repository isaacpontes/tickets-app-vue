<script setup>
import { ref, watch } from 'vue'
import { updateSubscriber } from '../services/subscribers';
import { useLocationStore } from '../stores/location';
import { useSubscriberStore } from '../stores/subscriber';
import Alert from './common/Alert.vue'
import Modal from './common/Modal.vue';
import Label from './common/Label.vue';
import Input from './common/Input.vue';
import ModalHeader from './common/ModalHeader.vue';
import ModalFooter from './common/ModalFooter.vue';

const props = defineProps(['subscriber'])

const subscriberStore = useSubscriberStore()
const locationStore = useLocationStore()

const updatedSubscriber = ref({})

const alert = ref({ show: false, message: '', color: '' })

watch(
  () => props.subscriber,
  () => {
    console.log(props.subscriber)
    updatedSubscriber.value = {
      ...props.subscriber,
      birthday: props.subscriber?.birthday.replace(/T.+Z$/, '')
    }
  }
)

async function handleSubmit(ev) {
  ev.preventDefault()
  try {
    await updateSubscriber(updatedSubscriber.value)
    subscriberStore.updateSubscriber(updatedSubscriber.value)
    toggleAlert('Contribuinte atualizado com sucesso.', 'success')
  } catch (err) {
    const message = err.response?.data?.message || err.message
    toggleAlert(message, 'danger')
  }
}

function toggleAlert(message, color = 'primary') {
  alert.value = { show: !alert.show, message, color }
  setTimeout(() => {
    alert.value = { show: false, message: '', color: '' }
  }, 1000 * 5)
}
</script>

<template>
  <Modal id="editSubscriberModal">
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
            v-model="updatedSubscriber.name"
            placeholder="Ex.: João Francisco da Silva"
            required
          />
        </div>
        <div class="mb-3">
          <Label for="birthday">Data de Nascimento</Label>
          <Input
            id="birthday"
            type="date"
            v-model="updatedSubscriber.birthday"
            required
          />
        </div>
        <div class="mb-3">
          <Label for="document">CPF</Label>
          <Input
            id="document"
            v-model="updatedSubscriber.document"
            placeholder="Digite somente números"
            required
          />
        </div>
        <div class="mb-3 form-check form-switch">
          <input
            v-model="updatedSubscriber.isUpdated"
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
            v-model="updatedSubscriber.locationId"
          >
            <option
              v-for="location in locationStore.locations"
              :value="location.id"
              :key="location.id"
              :selected="updatedSubscriber.location?.id === location.id"
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