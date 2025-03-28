import React from 'react'
import { Modal } from 'antd';
import { Order, OrderStatus } from '@/types';
import Image from 'next/image';
import { convertUtcTimeToVNTime } from '@/utils';

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

interface BillProps {
  visible: boolean;
  onClose: () => void;
  order: Order | null;
}

const Bill: React.FC<BillProps> = ({ visible, onClose, order }) => {
  const getStatusLabel = (status: OrderStatus | undefined): string => {
    switch (status) {
      case 'pending':
        return 'Đang xử lý';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'shipped':
        return 'Đang giao hàng';
      case 'canceled':
        return 'Đã hủy';
      case 'delivered':
        return 'Giao hàng thành công';
      default:
        return 'Không xác định';
    }
  };

  return (
    <Modal
      title="Chi tiết đơn hàng"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className='ml-2'>
        <p className='mb-2'><span>Mã đơn hàng: </span>{order?._id}</p>
        <p className='mb-2'><span>Tên người nhận: </span>{order?.name}</p>
        <p className='mb-2'><span>Số điện thoại: </span>{order?.phone}</p>
        <p className='mb-2'>
          <span>Địa chỉ: </span>
          {order?.address?.street}, {order?.address?.ward}, {order?.address?.district}, {order?.address?.province}
        </p>
        <p className='mb-2'><span>Phương thức thanh toán: </span>{order?.payment?.method === 'cash' ? 'Tiền mặt' : 'Thẻ tín dụng'}</p>
        {order?.trackingNumber && (
          <p className='mb-2'>Mã vận chuyển: {order.trackingNumber}</p>
        )}
        <p className='mb-2'>Trạng thái đơn hàng: {getStatusLabel(order?.status)}</p>
        <p className='mb-4'>Ngày đặt: {convertUtcTimeToVNTime(order?.createdAt ?? '')}</p>
        <div className="mb-4">
          {order?.products.map((product: any) => (
            <div key={product.productId} className="flex mb-2">
              <div className="mr-4">
                <Image src={product.thumbnail} alt={product.name} width={100} height={100} />
              </div>
              <div>
                <p className="font-bold">{product.name}</p>
                <p>Số lượng: {product.quantity}</p>
                <p>Giá: {VND.format(product.price)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center space-x-2">
          <p className="text-gray-700 font-bold">Phí ship:</p>
          <p className="text-lg font-bold">{VND.format(order?.checkout.freeShip || 0)}</p>
        </div>
        <div className="flex justify-end items-center space-x-2">
          <p className="text-gray-700 font-bold">Tổng tiền:</p>
          <p className="text-lg font-bold text-orange-400">{VND.format(order?.checkout.totalCheckout || 0)}</p>
        </div>
      </div>
    </Modal>
  )
}

export default Bill