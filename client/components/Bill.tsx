import React from 'react'
import { Modal } from 'antd';
import { Order } from '@/types';
import Image from 'next/image';

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
  return (
    <Modal
      title="Chi tiết đơn hàng"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className='ml-2'>
        <p className='mb-2'><span>Mã đơn hàng: </span>{order?.trackingNumber}</p>
        <p className='mb-2'><span>Tên người nhận: </span>{order?.name}</p>
        <p className='mb-2'><span>Số điện thoại: </span>{order?.phone}</p>
        <p className='mb-2'>
          <span>Địa chỉ: </span>
          {order?.address?.street}, {order?.address?.ward}, {order?.address?.district}, {order?.address?.province}
        </p>
        <p className='mb-2'><span>Phương thức thanh toán: </span>{}</p>
        <p className='mb-4'>Trạng thái đơn hàng: {order?.status}</p>
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