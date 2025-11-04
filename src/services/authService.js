import axiosInstance from "./axiosInstance";

export const registerUser = async (data) => {
    try {
        return await axiosInstance.post('/users/register', data);
    } catch (error) {
        console.error('Error al registrarse:', error);
        throw error;
    }
}


export const loginUser = async (data) => {
    try {
        return await axiosInstance.post('/users/login', data)
    } catch (error) {
        console.error('Error al iniciar sesiÃ³n:', error);
        throw error;
    }
}

