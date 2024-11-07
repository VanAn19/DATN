import axiosInstance from "./axiosInstance";
import { getCookie } from "@/utils";

export const getUserFavorite = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.get('/favorite', {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during get user favorite product api:", error);
    throw error;
  }
}

export const addProductToFavorite = async (productId: string) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/favorite/add', { productId }, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during add user favorite product api:", error);
    throw error;
  }
}

export const removeProductFromFavorite = async (productId: string) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/favorite/remove', { productId }, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during remove user favorite product api:", error);
    throw error;
  }
}