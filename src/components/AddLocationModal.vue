<script setup>
import { reactive, ref } from 'vue'
import { api } from '../services/api';
import Alert from './Alert.vue';

const props = defineProps(['addLocation'])

const locationName = ref('')
const initialState = { show: false, message: '', color: 'primary' }
const alert = reactive({ ...initialState })

async function handleSubmit(ev) {
  ev.preventDefault()
  try {
    const response = await api.post('/locations', { name: locationName.value })
    props.addLocation(response.data)
    locationName.value = ''
    toggleAlert('Local criado com sucesso.', 'success')
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
    Object.assign(alert, initialState)
  }, 1000 * 3)
}
</script>

<template>
  <div class="modal fade" id="addLocationModal" tabindex="-1" aria-labelledby="addLocationModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addLocationModalLabel">Adicionar novo local</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form v-on:submit="handleSubmit">
          <div class="modal-body">
            <span class="text-secondary">Cria um novo local, seu estoque e sua mesa no banco de dados.</span>
            <hr>
            <alert :show="alert.show" :color="alert.color" :message="alert.message" />
            <div class="mb-3">
              <label for="locationName" class="form-label">Nome do Local</label>
              <input v-model="locationName" type="text" class="form-control" id="locationName" placeholder="Ex.: Centro"
                required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="submit" class="btn btn-primary">Criar Local</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>