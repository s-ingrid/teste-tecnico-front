import axiosInstance from '../axios/axios'

export default {
    async createUser(userData) {
        try {
            const response = await axiosInstance.post('/users', userData)
            return response.data
        } catch (error) {
            console.error("Erro API criar usuário:", error)
            throw error
        }
    },
    async updateUser(userId, userData) {
        try {
            const response = await axiosInstance.put(`/users/${userId}`, userData)
            return response.data
        } catch (error) {
            console.error("Erro API editar usuário:", error)
            throw error
        }
    },
    async deleteUser(userId) {
        try {
            const response = await axiosInstance.delete(`/users/${userId}`)
            return response.data
        } catch (error) {
            console.error("Erro API deletar usuário:", error)
            throw error
        }
    },
    async getUser(userId) {
        try {
            const response = await axiosInstance.get(`/users/${userId}`)
            return response.data
        } catch (error) {
            console.error("Erro API listar usuário:", error)
            throw error
        }
    },
    async getAllUsers(page = 1) {
        try {
            const response = await axiosInstance.get(`/users?page=${page}`)
            return response.data
        } catch (error) {
            console.error("An error occurred while fetching all users:", error)
            throw error
        }
    }
}