import axios from "axios";

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_API_URL
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            const message = error.response?.data?.message || '';
            if (message.toLowerCase().includes('token')) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                if (window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
                    window.location.href = '/signin';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;