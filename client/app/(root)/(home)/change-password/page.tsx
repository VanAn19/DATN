'use client'

import { changePassword } from '@/api/auth';
import { checkAvailableLogin } from '@/utils';
import { Button, Card, Form, Input, message, notification } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuth = checkAvailableLogin();
    if (!isAuth) {
      router.push('/sign-in');
    }
  }, [router]);

  const handleChange = async (values: any) => {
    setLoading(true);
    try {
      const res = await changePassword(values);
      if (res.status === 200) {
        notification.success({
          message: 'Thành công',
          description: 'Mật khẩu của bạn đã được thay đổi.',
        });
        form.resetFields();
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        notification.error({
          message: 'Thất bại',
          description: 'Sai mật khẩu hiện tại!',
        });
      } else {
        console.error("Error during change password: ", error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-center items-center py-5'>
      <Card title="Đổi mật khẩu" className='w-[70%]'>
        <Form form={form} layout="vertical" onFinish={handleChange}>
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu hiện tại"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Mật khẩu xác nhận không khớp!')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu mới"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4 h-14 custom-btn"
              loading={loading}
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ChangePassword