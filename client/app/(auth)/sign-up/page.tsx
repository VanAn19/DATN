'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import images from '@/public/images';
import '../../../styles/auth/signup.scss'
import { Button, Checkbox, Col, Form, Input, message, Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { signup } from '@/api/auth';
import { setCookie } from '@/utils';

const SignUp = () => {
  const expirationHours = 12;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await signup(values);
      if (res.status === 201) {
        setCookie('user', res.metadata.user, expirationHours);
        router.push('/otp-verified');
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"
      style={{
        background: `url(${images.background}) 0% 0% / contain`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white flex shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="w-1/2 hidden lg:block">
          <Image
            src={images.imgSignUp}
            alt="Sign Up Image"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Dao Trọng Bình - Người giúp việc nhiệt tình! 👋</h2>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ username: '', name: '', phone: '', email: '', address: '' }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tên đăng nhập"
                  name="username"
                  rules={[{ required: true, message: 'Tên đăng nhập là bắt buộc' }]}
                >
                  <Input placeholder="Nhập tên đăng nhập" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    { required: true, message: 'Số điện thoại là bắt buộc' },
                    {
                      pattern: /^((\+84|0)[3|5|7|8|9])+([0-9]{8})$/,
                      message: 'Số điện thoại không hợp lệ',
                    },
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Họ tên"
              name="name"
              rules={[{ required: true, message: 'Họ tên là bắt buộc' }]}
            >
              <Input placeholder="Nhập họ tên" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email là bắt buộc' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            {/* <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Địa chỉ là bắt buộc' }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item> */}

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: 'Mật khẩu là bắt buộc' },
                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                    { max: 18, message: 'Mật khẩu không được quá 18 ký tự' },
                  ]}
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Nhập lại mật khẩu"
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Nhập lại mật khẩu là bắt buộc' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Mật khẩu nhập lại không khớp');
                      },
                    }),
                    { min: 6, message: 'Mật khẩu nhập lại phải có ít nhất 6 ký tự' },
                    { max: 18, message: 'Mật khẩu nhập lại không được quá 18 ký tự' },
                  ]}
                >
                  <Input.Password placeholder="Nhập lại mật khẩu" />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-4 h-14 custom-btn"
              icon={isLoading ? <LoadingOutlined /> : null}
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </Form>

          <div className="text-center mt-4">
            Đã có tài khoản?{' '}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp