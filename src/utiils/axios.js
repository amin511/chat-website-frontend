import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const costumFetch = axios.create({
    baseURL: 'http://localhost:3001/api/v1'
});

costumFetch.interceptors.request.use((config) => {
    const user = getUserFromLocalStorage();
    if (user) {
        config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
})

export default costumFetch;
