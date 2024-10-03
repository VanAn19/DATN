'use client'

import React, { useEffect, useState } from 'react'
import { Table, Button, Input, Select, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Category } from '@/types';
import Link from 'next/link';
import { getListCategory } from '@/api/category';

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
        <div className='flex flex-col space-y-2 text-blue-500'>
          <Link href='/'>Cập nhật</Link>
          <Link href='/'>Xóa</Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
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
      />
    </div>
  )
}

export default AdminCategory