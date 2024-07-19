import axiosInstance from '../axios/axios'

export default {
    async userLogin(user) {
        try {
            const response = await axiosInstance.post('/login', user)
            return response.data
        } catch (error) {
            console.error("Erro.", error)
            throw error
        }
    }
}