'use client'

import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Upload, Select, notification } from 'antd';
import { Category, FileItem } from '@/types';
import { createCategory, getInfoCategory, getListCategory, updateCategory } from '@/api/category';
import { useParams, useRouter } from 'next/navigation';

const UpdateCategory = () => {
  const [form] = Form.useForm();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      if (id) {
        setLoading(true);
        try {
          const category = await getInfoCategory(id as string);
          setCategoryId(category._id);
          form.setFieldsValue({
            name: category.name,
          });
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchCategories();
  }, [id, form]);

  
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { name } = values;
      const res = await updateCategory(categoryId as string, {
        name
      });
      if (res.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Cập nhật danh mục thành công!.',
        });
        form.resetFields();
        router.push('/admin/categories');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setErrorMessage("Tên danh mục đã tồn tại.");
      } else {
        console.error('Error during update category:', error);
        notification.error({
          message: 'Failed',
          description: "Đã xảy ra lỗi, vui lòng thử lại sau."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="w-full h-full max-w-7xl bg-white rounded-lg shadow-lg p-10"> 
        <h2 className="text-2xl font-bold mb-6">Cập nhật danh mục</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[
              { required: true, message: 'Vui lòng nhập tên danh mục!' },
              { min: 5, max: 100, message: 'Tên danh mục phải từ 5 đến 100 ký tự.' }
            ]}
          >
            <Input placeholder="Tên danh mục" />
          </Form.Item>
          {errorMessage && <p className="text-red-500 text-sm mb-1">{errorMessage}</p>}

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

export default UpdateCategory