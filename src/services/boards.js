import { generatePdfReport } from "./pdf"

export function generateMonthlyBoardsReport(boards, month, year) {
  const date = month && year ? new Date(year, month - 1) : new Date()
  const monthString = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).replace(/^[0-9]+\sde\s/, '')
  const body = boards.map(entry => [
    entry.board.location.name,
    `${entry.previousTickets / 100} talões / ${entry.previousTickets} tickets`,
    `${entry.ticketsWithdrawn / 100} talões / ${entry.ticketsWithdrawn} tickets`,
    `${entry.ticketsRequested / 100} talões / ${entry.ticketsRequested} tickets`,
    `${entry.finalTickets / 100} talões / ${entry.finalTickets} tickets`,
  ])
  generatePdfReport({
    title: 'Balanço Geral Mensal',
    description: `Relatório de tickets na mesa referente ao mês de ${monthString}`,
    thead: [['Localidade', 'Saldo Anterior', 'Entradas', 'Saídas', 'Saldo Atual']],
    tbody: body,
    filename: `balanco-geral-mesa-${date.getMonth() + 1}-${date.getFullYear()}`
  })
}