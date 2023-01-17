import { api } from "./api"

export async function getGeneralMonthlyReport() {
  try {
    const response = await api.get('/reports/general/monthly')
    return response.data
  } catch (err) {
    alert(err.message)
    return { boards: [], inventories: [] }
  }
}