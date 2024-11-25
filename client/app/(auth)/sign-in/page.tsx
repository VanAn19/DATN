'use client'

import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { signin } from '@/api/auth';
import { setCookie } from '@/utils';
import { CHANGE_STATUS_AUTH, CHANGE_VALUE_USER } from '@/redux/slices/authSlice';
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Form, Input, message, Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import images from '@/public/images';

const SignIn = () => {
  const expirationHours = 12;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await signin(values);
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
        message.error("Tên người dùng không tồn tại.");
      } else if (error.response?.status === 401) {
        message.error("Sai mật khẩu, vui lòng kiểm tra lại.");
      } else {
        console.error('Error sign in:', error);
        message.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
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
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Tên người dùng là bắt buộc' }]}
          >
            <Input placeholder="Nhập tên đăng nhập" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Mật khẩu là bắt buộc' }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <div className="flex justify-end items-center mb-4">
            <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-500 text-sm">
              Quên mật khẩu?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-4 custom-btn"
              disabled={isLoading}
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
            </Button>
          </Form.Item>
        </Form>

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