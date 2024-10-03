'use client'

import React, { useEffect, useState } from 'react'
import { Table, Button, Input, Select, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Product } from '@/types';
import Image from 'next/image';
import { getDraftProductsList, getProductsList, publishProduct } from '@/api/product';
import Link from 'next/link';
import { getStock } from '@/api/inventory';

const { Search } = Input;
const { Option } = Select;

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const DraftProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getDraftProductsList();
        setProducts(res);  
      } catch (error) {
        console.error("Error during fetch draft product: ", error);
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

  const handlePublish = async (productId: string) => {
    setLoading(true);
    try {
      await publishProduct({ id: productId });
      notification.success({
        message: 'Phát hành sản phẩm thành công!',
      });
      const updatedProducts = await getDraftProductsList();
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error during unpublished product:");
    } finally {
      setLoading(false);
    }
  }

  const getStockData = (productId: string, field: 'soldQuantity' | 'stock') => {
    const stock = stocks.find((s: any) => s.productId === productId);
    return stock ? stock[field] : 0;
  };

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
      render: (price: number) => `${VND.format(price)}`,
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
        <div className='flex flex-col space-y-2 text-blue-500'>
          <Button type='link' onClick={() => handlePublish(product._id)}>Phát hành</Button>
          <Link href={`/products/${product.slug}`}>Xem trước</Link>
          <Link href='/'>Cập nhật</Link>
          <Link href='/'>Xóa</Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* <Search
          placeholder="Tìm tên sản phẩm, SKU sản phẩm, Mã sản phẩm..."
          onSearch={(value) => console.log(value)}
          enterButton
          style={{ width: '300px' }}
        />
        <Link href="/admin/products/new" passHref>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm 1 sản phẩm mới
          </Button>
        </Link> */}
        <h1>Danh sách bản nháp sản phẩm</h1>
      </div>
      <Table
        columns={columns}
        dataSource={products}
        loading={loading}
        rowKey={(product: Product) => product._id}
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}

export default DraftProducts