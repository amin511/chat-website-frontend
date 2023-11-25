import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

// export const ENDPOINTS = process.env.ENDPOINTS;
export const ENDPOINTS = import.meta.env.MODE === 'development'
    ?
    import.meta.env.VITE_DEV_ENDPOINTS
    :
    import.meta.env.VITE_PROD_ENDPOINTS


const costumFetch = axios.create({
    baseURL: `${ENDPOINTS}/api/v1`
});

costumFetch.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage();
    if (user) {
        config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
})

export default costumFetch;
