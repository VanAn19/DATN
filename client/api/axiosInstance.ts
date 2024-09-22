import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '@/types';

const axiosInstance = axios.create({
  baseURL: process.env.API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'c28d30a7dd444349aa4cd719f07110d5d8f76c126264b2c7acc1f5175058cf038d29403c81a028f3384653d754d9bf1e0b0190caba7399c09b1b98c9f4b3d35d'
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
