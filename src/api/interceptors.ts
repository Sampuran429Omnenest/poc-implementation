import api from './axios';
import { useAuthStore } from '../store/useAuthStore';
import { getAuthHeaders } from '../shared/utils/requestHeader';
export const setupInterceptors = () => {

    api.interceptors.request.use(
        (config) => {
            const { accessToken } = useAuthStore.getState();
            const headers = getAuthHeaders(accessToken ?? undefined);
            Object.assign(config.headers, headers);
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            // const status = error?.response?.status;
            // const { reset } = useAuthStore.getState();

            // if (status === 401) {
            //     reset();
            //     window.location.href = '/'; //for now keeping it / it should be again redirected to /login if wrong 
            // }
            return Promise.reject(error);
        }
    );
};