import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.API_ROOT,
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-api-key': process.env.API_KEY
    },
});

export const uploadImage = async (data: any) => {
  try {
    const response = await axiosInstance.post('/upload', data);
    return response.data; 
  } catch (error) {
    console.error("Error during upload image api:", error);
    throw error;
  }
};

export const uploadImages = async (data: any) => {
  try {
    const response = await axiosInstance.post('/upload/multiple', data);
    return response.data; 
  } catch (error) {
    console.error("Error during upload images api:", error);
    throw error;
  }
};

export const deleteImage = async ({ publicId }: { publicId: string}) => {
  try {
    const response = await axiosInstance.delete(`/upload/${publicId}`);
    return response.data; 
  } catch (error) {
    console.error("Error during delete image api:", error);
    throw error;
  }
}