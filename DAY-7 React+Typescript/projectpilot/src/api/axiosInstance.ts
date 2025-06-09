import axios from "axios";
import { getAuthContext } from "../auth/authContextSingleton";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, //to send refresh cookies
});

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const auth = getAuthContext();

            try {
                const newToken = await auth.refreshToken();
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (e) {
                return Promise.reject(e);
            }
        }
    }
);

export default axiosInstance;