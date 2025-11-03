import axiosInstance from "./axiosInstance";


export const getComments = async () => {
    try {
        const response = await axiosInstance.get('/comments');
        return response.data
    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
        throw error;
    }
}

export const createComment = async (data) => {
    try {
        const response = await axiosInstance.post('/comments', data)
        return response.data;
    } catch (error) {
        console.error('Error al postear el comentario:', error);
        throw error;
    }
}
export const likeComment = async (id) => {
    try {
        const response = await axiosInstance.put(`/comments/${id}/like`)
        return response.data;
    } catch (error) {
        console.error('Error al enviar el like:', error);
        throw error;
    }
}