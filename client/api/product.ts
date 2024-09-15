import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { ProductResponse } from "./types";
import { Product } from "@/types";

export const getBestSellingProducts = async () => {
  try {
    const response: AxiosResponse<ProductResponse> = await axiosInstance.get('/product/published/all');
    return response.data.metadata as Product[]; 
  } catch (error) {
    console.error("Error during get best selling products api:", error);
    throw error;
  }
};
