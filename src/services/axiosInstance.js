import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5173/api',
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Estructura estándar de error
        const customError = {
            message: "Error inesperado. Intenta nuevamente.",
            status: error.response?.status || 500,
            url: error.config?.url,
        };

        // Personalización según código HTTP
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    customError.message = "Solicitud incorrecta (400).";
                    break;
                case 401:
                    customError.message = "No autorizado (401). Inicia sesión nuevamente.";
                    break;
                case 403:
                    customError.message = "Acceso denegado (403).";
                    break;
                case 404:
                    customError.message = "Recurso no encontrado (404).";
                    break;
                case 500:
                    customError.message = "Error interno del servidor (500).";
                    break;
                default:
                    customError.message = error.response.data?.message || customError.message;
            }
        }

        console.error(`❌ [API ERROR]: ${customError.status} → ${customError.url}`);
        console.error(customError);

        // Propagar error estandarizado
        return Promise.reject(customError);
    }
);

export default axiosInstance;
