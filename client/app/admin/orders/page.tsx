'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Table, Button, Input, Select, notification } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Order, OrderStatus, Product, ProductCart } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { getOrderByAdmin, searchOrderByAdmin, updateStatusOrder } from '@/api/order';
import debounce from 'lodash.debounce';
import Title from 'antd/es/typography/Title';

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

const formatOrders = (ordersData: any[]): Order[] => {
  return ordersData.map((order: any) => ({
    _id: order._id,
    name: order.name,
    phone: order.phone,
    address: order.address,
    checkout: order.checkout,
    products: order.products.flatMap((product: any) =>
      product.products.map((item: any) => ({
        ...item,
        priceRaw: order.products[0].priceRaw,
      }))
    ),
    payment: order.payment,
    trackingNumber: order.trackingNumber,
    status: order.status as OrderStatus,
  }));
};

const AdminOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const res = await getOrderByAdmin();
        if (res.status === 200) {
          setOrders(formatOrders(res.metadata));
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
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật trạng thái đơn hàng thành công.',
        });
        if (newStatus === 'shipped' || 'confirmed' || 'pending') {
          const updatedOrder = res.metadata;
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? { ...order, status: newStatus, trackingNumber: updatedOrder.trackingNumber }
                : order
            )
          );
        } else {
          setOrders(prevOrders => 
            prevOrders.map(order => 
              order._id === orderId ? { ...order, status: newStatus } : order
            )
          );
        }
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        notification.error({
          message: 'Thất bại',
          description: "Không thể thay đổi trạng thái đơn hàng khi đã giao thành công hoặc đã hủy."
        });
      } else {
        console.error("Error during update order status: ", error);
      }
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
          const res = await searchOrderByAdmin(value);
          if (res.status === 200) {
            setOrders(formatOrders(res.metadata)); 
          }
        } catch (error) {
          console.error("Error during search order: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        const res = await getOrderByAdmin();
        setOrders(formatOrders(res.metadata));
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'products',
      key: 'products',
      render: (_: any, order: Order) => (
        <div>
        {order.products.map((product: ProductCart) => (
          <div className='flex mb-2' key={product.productId}>
            {/* <Image 
              src={product.thumbnail} 
              alt={product.name} 
              width={100} 
              height={100} 
            /> */}
            <div className=''>
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
      title: 'Phương thức thanh toán',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment: { method: string }) => (
        payment.method === 'cash' ? 'Tiền mặt' : 'Thẻ tín dụng'
      ),
    },
    {
      title: 'Mã vận chuyển',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
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
      <Title level={4} className='px-3'>Danh sách đơn hàng</Title>
      <div className="flex justify-between items-center mb-4">
        <Input 
          value={searchValue}
          onChange={handleSearchInputChange}
          placeholder='Tìm theo mã đơn hàng, mã vận chuyển...' 
          prefix={<SearchOutlined style={{ cursor: 'pointer' }} />}
          className='w-2/3'
        />
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey={(order: Order) => order._id}
        pagination={{ pageSize: 10 }}
        className='custom-table-header'
      />
    </div>
  )
}

export default AdminOrder