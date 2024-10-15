import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { getCookie } from "@/utils";
import { CheckoutPayload, OrderPayload } from "@/types";

const infoUser = getCookie('user');
const token = getCookie('token');

export const checkoutReview = async (checkoutData: CheckoutPayload) => {
  try {
    const response = await axiosInstance.post('/order/review', checkoutData, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during checkout review api:", error);
    throw error;
  }
};

export const orderByUser = async (orderData: OrderPayload) => {
  try {
    const response = await axiosInstance.post('/order/order', orderData, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during order api:", error);
    throw error;
  }
};

export const getOrderByUser = async () => {
  try {
    const response = await axiosInstance.get('/order', {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during get order by user api:", error);
    throw error;
  }
};

export const cancelOrderByUser = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/order/cancel/${id}`, {}, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during cancel order by user api:", error);
    throw error;
  }
};