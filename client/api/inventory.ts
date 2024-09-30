import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { OneProductResponse, Product, ProductResponse } from "@/types";
import { getCookie } from "@/utils";

const infoUser = getCookie('user');
const token = getCookie('token');

export const getStock = async () => {
  try {
    const response = await axiosInstance.get('inventory', {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during get stock api:", error);
    throw error;
  }
}