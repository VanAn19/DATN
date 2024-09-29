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
