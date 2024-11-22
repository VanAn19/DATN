import axiosInstance from "./axiosInstance";
import { getCookie } from "@/utils";

export const uploadCommentByUser = async (data: { 
  images: { publicId: string, imageUrl: string, thumbUrl: string }[], 
  content: string, 
  product: string 
}) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/comment/upload', data, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during upload comment by user api:", error);
    throw error;
  }
};

export const getCommentByProductId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/comment/${id}`);
    return response.data; 
  } catch (error) {
    console.error("Error during get comment by product api:", error);
    throw error;
  }
};

export const deleteCommentById = async (id: string) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.delete(`/comment/${id}`, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during delete comment by id api:", error);
    throw error;
  }
};