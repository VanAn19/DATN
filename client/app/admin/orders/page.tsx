'use client'

import React, { useEffect, useState } from 'react'
import { Table, Button, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Order, OrderStatus, Product, ProductCart } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { getOrderByAdmin, updateStatusOrder } from '@/api/order';

const { Search } = Input;

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const orderStatusOptions = [
  { label: 'Đang xử lý', value: 'pending' },
  { label: 'Đã xác nhận', value: 'confirmed' },
  { label: 'Đang giao hàng', value: 'shipped' },
  { label: 'Giao hàng thành công', value: 'delivered' },
  { label: 'Đã hủy', value: 'canceled' },
];

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const res = await getOrderByAdmin();
        if (res.metadata && Array.isArray(res.metadata)) {
          const fetchedOrders = res.metadata.map((order: any) => ({
            _id: order._id,
            name: order.name,
            phone: order.phone,
            address: order.address,
            checkout: order.checkout,
            products: order.products.flatMap((product: any) => product.products.map((item: any) => ({
              ...item,
              priceRaw: order.products[0].priceRaw, 
            }))),
            trackingNumber: order.trackingNumber,
            status: order.status as OrderStatus
          }));
          setOrders(fetchedOrders); 
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setLoading(true);
    try {
      const res = await updateStatusOrder({
        orderId,
        newStatus
      });
      console.log(res)
      if (res.status === 200) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error during update order status: ", error);
    } finally {
      setLoading(false);
    }
  }

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'products',
      key: 'products',
      render: (_: any, order: Order) => (
        <div>
        {order.products.map((product: ProductCart) => (
          <div className='flex mb-2' key={product.productId}>
            <Image 
              src={product.thumbnail} 
              alt={product.name} 
              width={100} 
              height={100} 
            />
            <div className='ml-5'>
              <p>{product.name}</p>
              <p className='text-gray-500'>Số lượng: {product.quantity}</p>
              <p className='text-gray-500'>Đơn giá: {VND.format(product.price)}</p>
            </div>
          </div>
        ))}
      </div>
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'checkout',
      key: 'checkout',
      render: (checkout: { totalPrice: number; freeShip: number; totalCheckout: number; }) => (
        <span>
          {VND.format(checkout.totalCheckout)}
        </span>
      ),
    },
    {
      title: 'Tên người nhận',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (address: { street: string; ward: string; district: string; province: string }) => (
        <span>
          {address?.street}, {address?.ward}, {address?.district}, {address?.province}
        </span>
      ),
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus, order: Order) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(order._id, newStatus)}
          options={orderStatusOptions}
          style={{ width: 150 }}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Search
          placeholder="Tìm kiếm theo mã đơn hàng..."
          onSearch={(value) => console.log(value)}
          enterButton
          style={{ width: '300px' }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey={(order: Order) => order._id}
        pagination={{ pageSize: 10 }}
      />
    </div>
  )
}

export default AdminOrder