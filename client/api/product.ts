import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { OneProductResponse, Product, ProductResponse } from "@/types";
import { getCookie } from "@/utils";

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
  const infoUser = getCookie('user');
  const token = getCookie('token');
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
  const infoUser = getCookie('user');
  const token = getCookie('token');
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
  const infoUser = getCookie('user');
  const token = getCookie('token');
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

export const createProduct = async (data: { 
  name: string, 
  thumbnail: string, 
  images: { publicId: string, imageUrl: string, thumbUrl: string }[], 
  description: string, 
  price: number, 
  sale: number, 
  quantity: number, 
  category: string, 
  isDraft: boolean 
}) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
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

export const updateProduct = async (id: string, data: { 
  name: string, 
  thumbnail: string, 
  images: { publicId: string, imageUrl: string, thumbUrl: string }[], 
  description: string, 
  price: number, 
  sale: number, 
  quantity: number, 
  category: string
}) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.patch(`product/update/${id}`, data, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during update product api:", error);
    throw error;
  }
}

export const removeProduct = async (id: string) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
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

export const filterProductByCategory = async (data: { category: string }) => {
  try {
    const response = await axiosInstance.post('/product/filter', data);
    return response.data;
  } catch (error) {
    console.error("Error during remove product api:", error);
    throw error;
  }
}

export const getListSearchProduct = async (keySearch: string) => {
  try {
    const response = await axiosInstance.get(`/product/search/${keySearch}`);
    return response.data;
  } catch (error) {
    console.error("Error during get list search product api:", error);
    throw error;
  }
}