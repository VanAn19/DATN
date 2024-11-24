import { getCookie } from "@/utils";
import axiosInstance from "./axiosInstance";

export const statisticByProduct = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.get(`/statistic/product`, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during get statistic by product api:", error);
    throw error;
  }
}