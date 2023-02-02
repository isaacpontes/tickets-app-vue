import { api } from './api'
import { generatePdfReport } from './pdf'
import calculateAge from '../utils/calculateAge'

export async function getAllSubscribers(page = 1, limit = 20) {
  try {
    const response = await api.get(`/subscribers?page=${page}&limit=${limit}`)
    return response.data
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
    alert('Ocorreu um erro ao obter os dados dos usuários cadastrados.')
    return { subscribers: [], total: 0 }
  }
}

export async function getSubscribersByLocation(locationId, page = 1, limit = 20) {
  try {
    const response = await api.get(`/locations/${locationId}/subscribers?page=${page}&limit=${limit}`)
    return response.data
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
    alert('Ocorreu um erro ao obter os dados dos usuários cadastrados.')
    return { subscribers: [], total: 0 }
  }
}

export async function createSubscriber({ name, birthday, document, isUpdated, locationId }) {
  try {
    const response = await api.post('/subscribers', {
      name,
      birthday,
      document,
      isUpdated,
      locationId
    })
    return response.data
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
    alert('Ocorreu um erro ao salvar os dados do usuário.')
  }
}

export async function updateSubscriber(subscriber) {
  try {
    await api.put(`/subscribers/${subscriber.id}`, {
      name: subscriber.name,
      birthday: subscriber.birthday,
      document: subscriber.document,
      isUpdated: subscriber.isUpdated,
      locationId: subscriber.locationId
    })
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
    alert('Ocorreu um erro ao atualizar os dados do usuário.')
  }
}

export async function deleteSubscriber(subscriberId) {
  await api.delete(`/subscribers/${subscriberId}`)
}

export async function searchSubscriberByName(name, page = 1, limit = 20) {
  try {
    const response = await api.get(`/subscribers/search?name=${name}`)
    return response.data
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
    alert('Ocorreu um erro ao realizar a pesquisar.')
    return { subscribers: [], total: 0 }
  }
}

export function generateTable(subscribers) {
  const allSubscribers = subscribers.map((sub, index) => {
    const birthday = new Date(new Date(sub.birthday).getTime() + (3 * 60 * 60 * 1000))
    const age = calculateAge(birthday)
    return [
      index + 1,
      sub.name,
      sub.isUpdated ? 'Sim' : 'Não',
      birthday.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      age,
      '',
      '',
      '',
      ''
    ]
  })
  return allSubscribers.filter(sub => sub[4] < 65)
}

export function downloadPdf(subscribers, location) {
  const today = new Date()
  const body = generateTable(subscribers)
  generatePdfReport({
    title: `Localidade: ${location}`,
    description: `Lista de usuários cadastrados no programa em ${today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/^[0-9]+\sde\s/, '')}`,
    thead: [['Nº', 'Nome', 'At', 'Dt. Nasc.', 'Idade', 'Qntd.', 'Nº Pass.', 'Data', 'Assinatura do Usuário Cadastrado']],
    tbody: body,
    filename: `lista-de-usuarios-${location.toLowerCase()}`
  })
}