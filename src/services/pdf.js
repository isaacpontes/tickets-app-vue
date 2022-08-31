import { jsPDF } from 'jspdf'
import autotable from 'jspdf-autotable'

export function generatePdfReport({ title, description, thead, tbody, filename }) {
  const doc = new jsPDF({ orientation: 'landscape' })
  doc.setFontSize(12)
  doc.addImage('/brasao.png', 'png', 14, 12)
  doc.addImage('/logo.png', 'png', 253, 11)
  doc.text('Programa Fidelense Cidadão', 36, 16)
  doc.text(title, 36, 22)
  doc.text(description, 36, 28)
  doc.line(14, 32, 283, 32)
  autotable(doc, {
    head: thead,
    body: tbody,
    startY: 36,
    bodyStyles: { fontSize: 9 },
  })
  doc.save(`${filename}.pdf`)
}