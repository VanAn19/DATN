import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '@/types';

const axiosInstance = axios.create({
  baseURL: process.env.API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
  },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<AuthResponse>) => {
    if (response.status === 200 || response.status === 201) {
      return response; 
    } else {
      console.error('Failed to save user data to external API:', response.status, response.statusText);
      throw new Error(`Failed with status: ${response.status}`);
    }
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token invalidation
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
