import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { OneProductResponse, Product, ProductResponse } from "@/types";
import { getCookie } from "@/utils";

const infoUser = getCookie('user');
const token = getCookie('token');

export const getProductsList = async () => {
  try {
    const response: AxiosResponse<ProductResponse> = await axiosInstance.get('/product/published/all');
    return response.data.metadata as Product[]; 
  } catch (error) {
    console.error("Error during get products list api:", error);
    throw error;
  }
};

export const getDraftProductsList = async () => {
  try {
    const response: AxiosResponse<ProductResponse> = await axiosInstance.get('/product/drafts/all', {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      },
    });
    return response.data.metadata as Product[]; 
  } catch (error) {
    console.error("Error during get draft products list api:", error);
    throw error;
  }
};

export const publishProduct = async ({ id }: { id: string }) => {
  try {
    const response = await axiosInstance.post(`/product/publish/${id}`, {},  {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error during publish product api:", error);
    throw error;
  }
};

export const unpublishProduct = async ({ id }: { id: string }) => {
  try {
    const response = await axiosInstance.post(`/product/unpublish/${id}`, {},  {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error during unpublish product api:", error);
    throw error;
  }
};

export const getInfoProduct = async (id: string) => {
  try {
    const response: AxiosResponse<OneProductResponse> = await axiosInstance.get(`/product/${id}`);
    return response.data.metadata;
  } catch (error) {
    console.error("Error during get info product api:", error);
    throw error;
  }
}

export const createProduct = async (data: { name: string, thumbnail: string, description: string, price: number, sale: number, quantity: number, category: string, isDraft: boolean }) => {
  try {
    const response = await axiosInstance.post('product/create', data, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during create product api:", error);
    throw error;
  }
}

export const removeProduct = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/product/delete/${id}`,  {
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