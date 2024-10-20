import { getCookie } from "@/utils";
import axiosInstance from "./axiosInstance";

export const getInfoUser = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.get('/profile', {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during get info user api:", error);
    throw error;
  }
}

export const updateInfoUser = async (data: { 
  name: string, 
  email: string, 
  phone: string, 
  avatar: string
}) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.patch('/profile', data, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during update info user api:", error);
    throw error;
  }
}