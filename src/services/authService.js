import { API } from "./axiosInstance";

export const registerUser = async (data) => {
    try {
        const response = await API.post('/api/register', data);
        return response.data;
    } catch (error) {
        console.error('Error al registrarse:', error);
        throw error;
    }
}


export const loginUser = async (data) => {
    try {
        const response = await API.post('/api/login', data)
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
}