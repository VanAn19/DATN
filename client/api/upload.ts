import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.API_ROOT,
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-api-key': 'c28d30a7dd444349aa4cd719f07110d5d8f76c126264b2c7acc1f5175058cf038d29403c81a028f3384653d754d9bf1e0b0190caba7399c09b1b98c9f4b3d35d'
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