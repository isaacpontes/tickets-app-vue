import { api } from './api'

export async function getAll() {
  try {
    const { data } = await api.get('/locations')
    return data
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
    alert('Ocorreu um erro ao obter os dados das localidades.')
    return []
  }
}

export async function createLocation(name) {
  try {
    const { data } = await api.post('/locations', { name })
    return data
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
    alert('Ocorreu um erro ao criar a localidade.')
  }
}