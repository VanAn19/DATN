import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { AuthResponse } from "@/types";
import { getCookie } from "@/utils";

export const signin = async (data: { username: string; password: string }) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post('/login', data);
    return response.data; 
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

export const logout = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/logout', {}, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}
