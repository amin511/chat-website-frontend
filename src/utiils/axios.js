import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const costumFetch = axios.create({
    baseURL: 'https://chat-website-xxiq.onrender.com/api/v1'
});

costumFetch.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage();
    if (user) {
        config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
})

export default costumFetch;
