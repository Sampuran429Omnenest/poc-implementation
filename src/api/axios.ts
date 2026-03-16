import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,   // sends httpOnly cookie on every request
    timeout: 15000,
});

export default api;