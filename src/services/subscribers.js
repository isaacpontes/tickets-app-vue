import { generatePdfReport } from './pdf'
import calculateAge from '../utils/calculateAge'

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