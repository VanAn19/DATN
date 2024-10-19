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

export const addToCart = async (product: { productId: string, quantity: number, name: string, price: number, thumbnail: string }) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/cart', {
      product: {
        productId: product.productId,
        quantity: product.quantity,
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail
      }
    }, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during add product to cart api:", error);
    throw error;
  }
};

export const deleteCartItem = async (productId: string) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.delete(`/cart/${productId}`, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during remove cart item api:", error);
    throw error;
  }
};

export const increaseQuantityCartItem = async (productId: string) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/cart/increase', { productId }, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during increase cart item api:", error);
    throw error;
  }
};

export const decreaseQuantityCartItem = async (productId: string) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/cart/decrease', { productId }, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during decrease cart item api:", error);
    throw error;
  }
};