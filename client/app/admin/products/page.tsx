'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Table, Button, Input, Select, notification, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Product } from '@/types';
import Image from 'next/image';
import { getListSearchProduct, getProductsList, removeProduct, unpublishProduct } from '@/api/product';
import Link from 'next/link';
import { getStock } from '@/api/inventory';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import Title from 'antd/es/typography/Title';

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stocks, setStocks] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProductsList();
        setProducts(res);
      } catch (error) {
        console.error("Error during fetch product: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchStock = async () => {
      setLoading(true);
      try {
        const res = await getStock();
        setStocks(res.metadata);
      } catch (error) {
        console.error("Error during fetch stock: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStock();
  }, [])

  const handleUnpublish = async (productId: string) => {
    setLoading(true);
    try {
      await unpublishProduct({ id: productId });
      notification.success({
        message: 'Đã lưu thành bản nháp!',
      });
      const updatedProducts = await getProductsList();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error during unpublished product:");
    } finally {
      setLoading(false);
    }
  }

  const handleRemoveProduct = async (productId: string) => {
    setLoading(true);
    try {
      await removeProduct(productId);
      notification.success({
        message: 'Xóa sản phẩm thành công!',
      });
      const updatedProducts = await getProductsList();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error during remove product:", error);
    } finally {
      setLoading(false);
    }
  }

  const getStockData = (productId: string, field: 'soldQuantity' | 'stock') => {
    const stock = stocks.find((s: any) => s.productId._id === productId);
    return stock ? stock[field] : 0;
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.trim()) {
        setLoading(true);
        try {
          const res = await getListSearchProduct(value);
          setProducts(res.metadata);
        } catch (error) {
          console.error("Error during search product: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        const res = await getProductsList();
        setProducts(res);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, product: Product) => (
        <div className='flex'>
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={100}
            height={100}
          />
          <div className='ml-5'>{product.name}</div>
        </div>
      ),
    },
    {
      title: 'Đã bán',
      dataIndex: 'soldQuantity',
      key: 'soldQuantity',
      render: (_: any, product: Product) => getStockData(product._id, 'soldQuantity'),
      sorter: (a: Product, b: Product) => getStockData(a._id, 'soldQuantity') - getStockData(b._id, 'soldQuantity'),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text: string, product: Product) => (
        <div className='flex flex-col'>
          <span>{VND.format(product.sellingPrice)}</span>
          <span className='line-through text-gray-400'>{VND.format(product.price)}</span>
        </div>
      ),
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: 'Kho hàng',
      dataIndex: 'stock',
      key: 'stock',
      render: (_: any, product: Product) => getStockData(product._id, 'stock'),
      sorter: (a: Product, b: Product) => getStockData(a._id, 'stock') - getStockData(b._id, 'stock'),
    },
    {
      title: 'Chất lượng nội dung',
      dataIndex: 'quality',
      key: 'quality',
      render: (quality: string) => (
        <div style={{ color: quality === 'Cần Cải Thiện' ? 'orange' : 'green' }}>
          {quality}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (product: Product) => (
        <div className='flex flex-col space-y-2 text-blue-500 text-center'>
          <Link href={`/admin/products/${product._id}`}>Cập nhật</Link>
          <Link href={`/products/${product.slug}`}>Xem trước</Link>
          <Button type='link' onClick={() => handleUnpublish(product._id)}>Lưu thành bản nháp</Button>
          <Button type='link' onClick={() => handleRemoveProduct(product._id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Tất cả sản phẩm</span>
            <Input
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder='Tìm theo tên sản phẩm...'
              prefix={<SearchOutlined style={{ cursor: 'pointer' }} />}
              className='w-2/3'
            />
            <Link href="/admin/products/new" passHref>
              <Button type="primary" icon={<PlusOutlined />}>
                Thêm 1 sản phẩm mới
              </Button>
            </Link>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={products}
          loading={loading}
          rowKey={(product: Product) => product._id}
          pagination={{ pageSize: 10 }}
          className='custom-table-header border rounded-lg'
          bordered
        />
      </Card >
    </div>
  )
}

export default AdminProducts