import axiosInstance from "./axiosInstance";

export const registerUser = async (data) => {
    try {
        return await axiosInstance.post('/register', data);
    } catch (error) {
        console.error('Error al registrarse:', error);
        throw error;
    }
}


export const loginUser = async (data) => {
    try {
        return await axiosInstance.post('/login', data)
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
}
