'use client'

import React, { useState } from 'react'
import { Form, Input, Button, Upload, Select, notification } from 'antd';
import { Category, FileItem } from '@/types';
import { createCategory, getListCategory } from '@/api/category';

const { TextArea } = Input;
const { Option } = Select;

const NewCategory = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { name } = values;
      const res = await createCategory({
        name
      });
      if (res.status === 201) {
        notification.success({
          message: 'Success',
          description: 'Danh mục đã được tạo thành công.',
        });
        form.resetFields();
      }
    } catch (error) {
      console.error("Error during create category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="w-full h-full max-w-7xl bg-white rounded-lg shadow-lg p-10"> 
        <h2 className="text-2xl font-bold mb-6">Thêm mới danh mục</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[
              { required: true, message: 'Vui lòng nhập tên danh mục!' },
              { min: 10, max: 100, message: 'Tên danh mục phải từ 10 đến 100 ký tự.' }
            ]}
          >
            <Input placeholder="Tên danh mục" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="default"
              htmlType="reset" 
              disabled={loading}  
              className='mr-5'
            >
              Hủy
            </Button>
            <Button 
              type="primary"  
              htmlType="submit" 
              loading={loading}
            >
              Lưu & Hiển thị
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default NewCategory