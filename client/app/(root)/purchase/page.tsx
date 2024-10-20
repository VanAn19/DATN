'use client'

import React, { useEffect, useState } from 'react'
import { ShoppingCartOutlined, MessageOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Button, Card, Col, Row, Tabs } from 'antd';
import { cancelOrderByUser, getOrderByUser } from '@/api/order';
import { Order, OrderStatus } from '@/types';
import Bill from '@/components/Bill';

const { TabPane } = Tabs;

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const statusOrder: Record<OrderStatus, { text: string; color: string; label: string; labelColor: string }> = {
  pending: {
    text: "Chưa giao hàng",
    color: "text-blue-500",
    label: "Đang chờ xử lý",
    labelColor: "text-yellow-500"
  },
  confirmed: {
    text: "Đang chuẩn bị hàng",
    color: "text-green-500",
    label: "Đã xác nhận",
    labelColor: "text-green-500"
  },
  shipped: {
    text: "Đang giao hàng",
    color: "text-yellow-500",
    label: "SHIPPED",
    labelColor: "text-orange-500"
  },
  canceled: {
    text: "Không giao hàng",
    color: "text-red-500",
    label: "Đã hủy",
    labelColor: "text-red-500"
  },
  delivered: {
    text: "Giao hàng thành công",
    color: "text-green-500",
    label: "Hoàn thành",
    labelColor: "text-orange-400"
  }
};

const Purchase = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchCart = async () => {
      try {
        const res = await getOrderByUser();
        if (res.status === 200) {
          const fetchedOrders = res.metadata.map((order: any) => ({
            _id: order._id,
            name: order.name,
            phone: order.phone,
            address: order.address,
            checkout: order.checkout,
            payment: order.payment,
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
    fetchCart();
  }, []);

  const handleCancelOrder = async (id: string) => {
    setLoading(true);
    try {
      const res = await cancelOrderByUser(id);
      if (res.status === 200) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === id ? { ...order, status: 'canceled' } : order
          )
        );
      }
    } catch (error) {
      console.error("Error during cancel order: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order); 
    setIsModalVisible(true); 
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tất cả" key="1">
          <Row gutter={16}>
            <Col span={24}>
              {orders.map(order => {
                const statusInfo = statusOrder[order.status as OrderStatus];
                return (
                  <Card
                    key={order._id}
                    extra={
                      statusInfo && (
                        <div className="flex items-end">
                          <p className={`text-xs ${statusInfo.color}`}>{statusInfo.text}</p>
                          <p className="text-xs text-gray-500 mr-2 ml-2">|</p>
                          <p className={`text-xs font-bold ${statusInfo.labelColor}`}>{statusInfo.label}</p>
                        </div>
                      )
                    }
                    actions={[
                      <Button key={1} icon={<ShoppingCartOutlined />} type="primary" onClick={() => handleViewDetails(order)}>
                        Xem chi tiết
                      </Button>,
                      <Button key={2} icon={<MessageOutlined />} type="default">
                        Liên hệ người bán
                      </Button>,
                      order.status === 'pending' && (
                        <Button key={3} type="default" danger onClick={() => handleCancelOrder(order._id)}>
                          Hủy đơn hàng
                        </Button>
                      )
                    ]}
                    className="hover:shadow-lg transition-shadow duration-300 mb-4"
                  >
                    {order.products.map((product: any) => (  
                      <div key={product.productId} className="flex mb-2">
                        <div className="mr-4">
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="flex-1 ml-4">  
                          <p className="text-lg font-bold">{product.name}</p> 
                          <p className='text-gray-500'>Số lượng: {product.quantity}</p>
                          <div className="flex items-center w-full"> 
                            <p className="text-gray-500">Đơn giá: {VND.format(product.price)}</p> 
                            <p className="text-lg font-bold ml-auto">{VND.format(product.price * product.quantity)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end items-center space-x-2"> 
                      <p className="text-gray-700 font-bold">Phí ship:</p>
                      <p className="text-lg font-bold">{VND.format(order.checkout.freeShip)}</p>
                    </div>
                    <div className="flex justify-end items-center space-x-2"> 
                      <p className="text-gray-700 font-bold">Thành tiền:</p>
                      <p className="text-lg font-bold text-orange-400">{VND.format(order.checkout.totalCheckout)}</p> 
                    </div>
                  </Card>
                )
              })}
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      <Bill visible={isModalVisible} onClose={() => setIsModalVisible(false)} order={selectedOrder} />
    </div>
  )
}

export default Purchase