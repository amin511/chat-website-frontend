import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

// export const ENDPOINTS = 'https://chat-website-xxiq.onrender.com'
// export const ENDPOINTS = "http://localhost:3001"
export const ENDPOINTS = 'https://chat-website-xxiq.onrender.com'

const costumFetch = axios.create({
    baseURL: `${ENDPOINTS}/api/v1`
    // baseURL: 'https://chat-website-xxiq.onrender.com/api/v1'
});

costumFetch.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage();
    if (user) {
        config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
})

export default costumFetch;
