import { Category } from "@/types";
import axiosInstance from "./axiosInstance";
import { getCookie } from "@/utils"; 

const infoUser = getCookie('user');
const token = getCookie('token');

export const getListCategory = async () => {
  try {
    const response = await axiosInstance.get('/category');
    return response.data; 
  } catch (error) {
    console.error("Error during get list category api:", error);
    throw error;
  }
}

export const getInfoCategory = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/category/${id}`, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data.metadata; 
  } catch (error) {
    console.error("Error during get info category api:", error);
    throw error;
  }
}

export const createCategory = async (data: { name: string }) => {
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

export const updateCategory = async (id: string, data: { 
  name: string, 
}) => {
  try {
    const response = await axiosInstance.patch(`category/update/${id}`, data, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during update category api:", error);
    throw error;
  }
}

export const removeCategory = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/category/delete/${id}`,  {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during remove product api:", error);
    throw error;
  }
}