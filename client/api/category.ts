import axiosInstance from "./axiosInstance";
import { getCookie } from "@/utils"; 

export const getListCategory = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.get('/category', {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during get list category api:", error);
    throw error;
  }
}

export const createCategory = async (data: { name: string }) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/category/create', data, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during create category api:", error);
    throw error;
  }
}