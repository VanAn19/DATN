import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { AuthResponse } from "./axiosInstance";

export const signin = async (data: { username: string; password: string }) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post('/login', data);
    return response.data; 
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};
