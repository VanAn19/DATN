import { getCookie } from "@/utils";
import axiosInstance from "./axiosInstance";

export const getInfoUser = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.get('/profile', {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during get info user api:", error);
    throw error;
  }
}

export const getAllUserByAdmin = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.get('/profile/all', {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during get all user api:", error);
    throw error;
  }
}

export const getListSearchUserByAdmin = async (keySearch :string) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.get(`/profile/search/${keySearch}`, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during get list search user api:", error);
    throw error;
  }
}

export const updateInfoUser = async (data: { 
  name: string, 
  email: string, 
  phone: string, 
  avatar: string
}) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.patch('/profile', data, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during update info user api:", error);
    throw error;
  }
}

export const updateStatusUser = async (data: { username: string, newStatus: string }) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.patch('/profile/update', data, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during update status user api:", error);
    throw error;
  }
};

export const addNewUserByAdmin = async (data: { username: string; password: string; name: string; email: string; phone: string; role: string }) => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/profile/add', data, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during add new user by admin api:", error);
    throw error;
  }
};