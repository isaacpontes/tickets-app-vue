import { jsPDF } from 'jspdf'
import autotable from 'jspdf-autotable'

export function generatePdfReport({ title, description, thead, tbody }) {
  const doc = new jsPDF({ orientation: 'landscape' })
  doc.setFontSize(12)
  doc.addImage('/logo.png', 'png', 14, 11)
  doc.text('Programa Fidelense Cidadão', 48, 16)
  doc.text(title, 48, 22)
  doc.text(description, 48, 28)
  doc.line(14, 32, 283, 32)
  autotable(doc, {
    head: thead,
    body: tbody,
    startY: 36
  })
  doc.save('balanco-geral-mensal.pdf')
}