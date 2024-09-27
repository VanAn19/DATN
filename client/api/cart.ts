import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { getCookie } from "@/utils";
import { ListCartResponse } from "@/types";

export const getListCart = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response: AxiosResponse<ListCartResponse> = await axiosInstance.get('/cart',  {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during get best selling products api:", error);
    throw error;
  }
};