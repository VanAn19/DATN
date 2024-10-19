'use client'

import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react'
import { MailOutlined } from '@ant-design/icons';
import { forgotPassword } from '@/api/auth';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      const { email } = values;
      const res = await forgotPassword(email);
      if (res.status === 200) {
        message.success('Vui lòng kiểm tra email để lấy lại mật khẩu!');
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        message.error('Email đăng kí không tồn tại!');
      } else {
        console.error("Error during forgot password: ", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Quên mật khẩu</h2>
        <Form name="forgot-password" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Nhập email của bạn!' },
              { type: 'email', message: 'Hãy nhập chuẩn dạng của email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
              type="email"
              className='custom-input'
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit" 
              disabled={loading}
              className={`w-full h-14 py-2 text-yellow-200 bg-black transition duration-200 ease-in-out rounded-lg 
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-yellow-300'}`}
            >
              {loading ? 'Đang gửi...' : 'Gửi'}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ForgotPassword