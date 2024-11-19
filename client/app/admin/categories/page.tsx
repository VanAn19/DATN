'use client'

import React, { useEffect, useState } from 'react'
import { Table, Button, Input, Select, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Category } from '@/types';
import Link from 'next/link';
import { getListCategory, removeCategory } from '@/api/category';
import Title from 'antd/es/typography/Title';

const { Search } = Input;

const AdminCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getListCategory();
        if (res.status === 200) {
          setCategories(res.metadata);  
        }
      } catch (error) {
        console.error("Error during fetch category: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleRemoveProduct = async (productId: string) => {
    setLoading(true);
    try {
      await removeCategory(productId);
      notification.success({
        message: 'Xóa sản phẩm thành công!',
      });
      const res = await getListCategory();
      setCategories(res.metadata);
    } catch (error) {
      console.error("Error during remove category:", error);
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, categories: Category) => (
        <div className='ml-5'>{categories.name}</div>
      ),
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'productCount',
      key: 'productCount',
      render: (productCount: number) => (
        <div>
          {productCount}    
        </div>
      )
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (category: Category) => (
        <div className='flex flex-col space-y-2 text-blue-500 text-center'>
          <Link href={`/admin/categories/${category._id}`}>Cập nhật</Link>
          <Button type='link' onClick={() => handleRemoveProduct(category._id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Title level={4} className='px-3'>Tất cả danh mục</Title>
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="Tìm tên danh mục, SKU danh mục, Mã danh mục..."
          onSearch={(value) => console.log(value)}
          enterButton
          style={{ width: '300px' }}
        />
        <Link href="/admin/products/new" passHref>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm 1 danh mục mới
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        rowKey={(categories) => categories._id}
        pagination={{ pageSize: 10 }}
        className='custom-table-header'
      />
    </div>
  )
}

export default AdminCategory