'use client'

import React, { useState } from 'react'
import { LockOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { resetPassword } from '@/api/auth';
import { useParams, useRouter } from 'next/navigation';

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const token = useParams();
  const router = useRouter();

  const onFinish = async (values: { password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      return message.error('Mật khẩu không khớp!');
    }
    setLoading(true);
    try {
      const { password } = values;
      const res = await resetPassword({
        token: token.token[0],
        password
      });
      if (res.status === 200) {
        message.success('Đặt lại mật khẩu thành công');
        router.push('/sign-in');
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        message.error('Đường dẫn hết hạn, vui lòng thử lại!');
      } else {
        console.error("Error during reset password: ", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Đặt lại mật khẩu</h2>
        <Form
          form={form}
          name="reset-password"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              { required: true, message: 'Nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 kí tự!' },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Mật khẩu mới"
              className='custom-input'
            />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Nhập lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập lại mật khẩu"
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

export default ResetPassword