import axiosInstance from "./axiosInstance";
import { getCookie } from "@/utils";

export const getStock = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
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

export const getSoldQuantity = async () => {
  try {
    const response = await axiosInstance.get('inventory/sold');
    return response.data;
  } catch (error) {
    console.error("Error during get stock api:", error);
    throw error;
  }
}