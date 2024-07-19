import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false
})

export default axiosInstance
