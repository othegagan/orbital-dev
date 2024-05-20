import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';

const authAxios: AxiosInstance = axios.create({
    timeout: 25000,
});

authAxios.interceptors.request.use(
    async config => {
        config.headers = {
            'Content-Type': 'application/json',
            Accept: '*/*',
            token: process.env.TOKEN || '', // pass the token here
        } as unknown as AxiosRequestHeaders;
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export default authAxios;
