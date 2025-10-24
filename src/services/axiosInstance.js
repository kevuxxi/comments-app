import axios from "axios";

localStorage.setItem('token', "fake_token_12345")

const API = axios.create({
    baseURL: 'http://localhost:5173/api',
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})