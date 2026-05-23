import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export const sendContactMessage = async (data) => {
  const response = await api.post('/contact', data)
  return response.data
}

export default api
