import { api } from './api'
import { generatePdfReport } from './pdf'

export async function getAll() {
  try {
    const { data } = await api.get('/inventories')
    return data
  } catch (err) {
    console.error(err.response?.data?.message || err.message)
    alert('Ocorreu um erro ao obter os dados dos estoques.')
    return []
  }
}

export function generateMonthlyInventoriesReport(inventories, month, year) {
  const date = month && year ? new Date(year, month - 1) : new Date()
  const monthString = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/^[0-9]+\sde\s/, '')
  const body = inventories.map(entry => [
    entry.inventory.location.name,
    `${entry.previousTickets / 100} talões / ${entry.previousTickets} tickets`,
    `${entry.ticketsAdded / 100} talões / ${entry.ticketsAdded} tickets`,
    `${entry.ticketsWithdrawn / 100} talões / ${entry.ticketsWithdrawn} tickets`,
    `${entry.finalTickets / 100} talões / ${entry.finalTickets} tickets`,
  ])
  generatePdfReport({
    title: 'Balanço Geral Mensal',
    description: `Relatório de estoque de tickets referente ao mês de ${monthString}`,
    thead: [['Localidade', 'Saldo Anterior', 'Entradas', 'Saídas', 'Saldo Atual']],
    tbody: body,
    filename: `balanco-geral-estoque-${date.getMonth() + 1}-${date.getFullYear()}`
  })
}