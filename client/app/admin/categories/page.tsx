'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Table, Button, Input, Select, notification, Card } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Category } from '@/types';
import Link from 'next/link';
import { getListCategory, getListSearchCategory, removeCategory } from '@/api/category';
import debounce from 'lodash.debounce';

const AdminCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
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

  console.log(categories);

  const handleRemoveProduct = async (productId: string) => {
    setLoading(true);
    try {
      await removeCategory(productId);
      notification.success({
        message: 'Xóa danh mục thành công!',
      });
      const res = await getListCategory();
      setCategories(res.metadata);
    } catch (error) {
      console.error("Error during remove category:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.trim()) {
        setLoading(true);
        try {
          const res = await getListSearchCategory(value);
          setCategories(res.metadata);
        } catch (error) {
          console.error("Error during search category: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        const res = await getListCategory();
        setCategories(res.metadata);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

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
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Tất cả danh mục</span>
            <Input
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder='Tìm theo tên danh mục...'
              prefix={<SearchOutlined style={{ cursor: 'pointer' }} />}
              className='w-2/3'
            />
            <Link href="/admin/categories/new" passHref>
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm 1 danh mục mới
              </Button>
            </Link>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={categories}
          loading={loading}
          rowKey={(categories) => categories._id}
          pagination={{ pageSize: 10 }}
          className='custom-table-header'
          bordered
        />
      </Card>
    </div>
  )
}

export default AdminCategory