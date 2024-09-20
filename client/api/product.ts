import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { OneProductResponse, Product, ProductResponse } from "@/types";

export const getBestSellingProducts = async () => {
  try {
    const response: AxiosResponse<ProductResponse> = await axiosInstance.get('/product/published/all');
    return response.data.metadata as Product[]; 
  } catch (error) {
    console.error("Error during get best selling products api:", error);
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
