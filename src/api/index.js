import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertClient = payload => api.post(`/client`, payload)
export const getAllClients = () => api.get(`/clients`)
export const updateClientById = (id, payload) => api.put(`/client/${id}`, payload)
export const deleteClientById = id => api.delete(`/client/${id}`)
export const getClientById = id => api.get(`/client/${id}`)

const apis = {
    insertClient,
    getAllClients,
    updateClientById,
    deleteClientById,
    getClientById,
}

export default apis