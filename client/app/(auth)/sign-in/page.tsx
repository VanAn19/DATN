'use client'

import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { signin } from '@/api/auth';
import { setCookie } from '@/utils';
import { CHANGE_STATUS_AUTH, CHANGE_VALUE_USER } from '@/redux/slices/authSlice';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import images from '@/public/images';

const schema = yup.object().shape({
  username: yup.string().required('Tên người dùng là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
});

const SignIn = () => {
  const expirationHours = 3;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async (data: any) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await signin(data);
      if (res.status === 200) {
        dispatch(CHANGE_STATUS_AUTH(true));
        dispatch(CHANGE_VALUE_USER(res));
        setCookie("token", res?.metadata?.tokens?.accessToken, expirationHours);
        setCookie("user", res?.metadata?.user, expirationHours);
        if (res.metadata.user.role === "user") {
          router.push("/");
        } else if (res.metadata.user.role === "admin") {
          router.push("/admin");
        }
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setErrorMessage("Tên người dùng không tồn tại.");
      } else if (error.response?.status === 401) {
        setErrorMessage("Sai mật khẩu, vui lòng kiểm tra lại.");
      } else {
        console.error('Error sign in:', error);
        setErrorMessage("Đã xảy ra lỗi, vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{ 
        background: `url(${images.background}) 0% 0% / contain`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
              Tên đăng nhập
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('username')}
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                Mật khẩu
              </label>
              <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-500 text-sm ml-auto">
                Quên mật khẩu?
              </Link>
            </div>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('password')}
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                        color: "white",
                      }}
                      spin
                    />
                  }
                />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Chưa có tài khoản?{' '}
          <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn