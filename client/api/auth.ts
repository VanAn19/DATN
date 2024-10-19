import axiosInstance from "./axiosInstance";
import { AxiosResponse } from 'axios'; 
import { AuthResponse } from "@/types";
import { getCookie } from "@/utils";

export const signin = async (data: { username: string; password: string }) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post('/login', data);
    return response.data; 
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

export const signup = async (data: { username: string; password: string; name: string; email: string; phone: string; address: string }) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post('/signup', data);
    return response.data; 
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};

export const verifyOtp = async (data: { username: string; otp: string }) => {
  try {
    const response = await axiosInstance.post('/verifyOTP', data);
    return response.data; 
  } catch (error) {
    console.error("Error during verify otp:", error);
    throw error;
  }
};

export const resendOtp = async (data: { username: string }) => {
  try {
    const response = await axiosInstance.post('/resendOTP', data);
    return response.data; 
  } catch (error) {
    console.error("Error during resend otp:", error);
    throw error;
  }
};

export const logout = async () => {
  const infoUser = getCookie('user');
  const token = getCookie('token');
  try {
    const response = await axiosInstance.post('/logout', {}, {
      headers: {
        'Authorization': token,
        'x-client-id': infoUser._id
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.get('/forgot-password', {
      params: {
        email
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Error during forgot password api:", error);
    throw error;
  }
}

export const resetPassword = async (data: { token: string, password: string }) => {
  try {
    const response = await axiosInstance.post('/reset-password', data);
    return response.data; 
  } catch (error) {
    console.error("Error during reset password api:", error);
    throw error;
  }
}
