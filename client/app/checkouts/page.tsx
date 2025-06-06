'use client'

import { getListCart } from '@/api/cart';
import { checkoutReview, orderByUser } from '@/api/order';
import Loader from '@/components/Loader';
import { CheckoutTotal, ProductCart } from '@/types';
import { checkAvailableLogin } from '@/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import data from '@/data/db.json'
import Link from 'next/link';
import { Form, Input, Select, Radio, notification } from 'antd';
import { notFound, useRouter } from 'next/navigation';
import images from '@/public/images';

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const Checkouts = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const isAuth = checkAvailableLogin();
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [total, setTotal] = useState<CheckoutTotal>({
    totalPrice: 0,
    freeShip: 0,
    totalCheckout: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedCommune, setSelectedCommune] = useState<string | null>(null);
  const [districts, setDistricts] = useState<any[]>([]);
  const [communes, setCommunes] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    const filteredDistricts = data.district.filter(district => district.idProvince === value);
    setDistricts(filteredDistricts);
    setSelectedDistrict(null);
    setCommunes([]);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    const filteredCommunes = data.commune.filter(commune => commune.idDistrict === value);
    setCommunes(filteredCommunes);
  };
  
  useEffect(() => {
    if (isAuth) {
      setLoading(true);
      const fetchCart = async () => {
        try {
          const res = await getListCart();
          setCartItems(res.metadata.products);
          setCartId(res.metadata._id);
          setLoading(false);
        } catch (err) {
          console.error("Failed to fetch cart:", err);
        } finally {
          setLoading(false);
          setIsLoading(false); 
        }
      }
      fetchCart();
    } else {
        setIsLoading(false); 
      }
  }, [isAuth])

  useEffect(() => {
    const getCheckout = async () => {
      if (cartId && cartItems.length > 0) {
        setLoading(true);
        try {
          const responseCheckout = await checkoutReview({ 
            cartId: cartId, 
            orderIds: [
              {
                products: cartItems.map(item => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  name: item.name,
                  price: item.price,
                  thumbnail: item.thumbnail
                })),
              }
            ]
          });
          setTotal(responseCheckout.metadata.checkoutOrder);
        } catch (err) {
          console.error("Failed to fetch checkout review:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    getCheckout();
  }, [cartId, cartItems]);  

  if (isLoading) {
    return <Loader />; 
  }

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const { name, phone, street, cardNumber, expirationDate, cardName } = values;
      const provinceName = data.province.find((p) => p.idProvince === selectedProvince)?.name || '';
      const districtName = data.district.find((d) => d.idDistrict === selectedDistrict)?.name || '';
      const communeName = data.commune.find((c) => c.idCommune === selectedCommune)?.name || '';
      if (cartId && cartItems.length > 0) {
        const res = await orderByUser({
          cartId,
          orderIds: [
            {
              products: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                name: item.name,
                price: item.price,
                thumbnail: item.thumbnail
              })),
            }
          ],
          address: {
            province: provinceName,
            district: districtName,
            ward: communeName,
            street: street || '',
          },
          payment: {
            method: paymentMethod,
            details: paymentMethod === 'cash' ? {} : {
              cardNumber,
              expirationDate,
              cardName
            }
          },
          name, 
          phone
        });
        if (res.status === 200) {
          form.resetFields();
          setCartId(null);
          setCartItems([]);
          router.push('/thanks');
        }
      }
    } catch (error: any) {
      console.error('Error during order product:', error);
      if (error.response?.status === 403) {
        notification.error({
          message: 'Failed',
          description: "Đã xảy ra lỗi, vui lòng thử lại sau."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="h-24 flex items-center justify-center bg-white border-b border-gray-300">
        <Link className='m-0 text-xl font-bold' href="/">DAO TRỌNG BÌNH</Link>
      </header>
      <div className="flex flex-row">
        <div className="xl:w-[50%] w-1/2 h-full bg-white border-r border-gray-300">
          <div className='w-4/5 p-8'>
            <p className='text-xl mb-4'>Vận chuyển</p>
            <Form form={form} onFinish={handleFinish} layout="vertical">
              <div className="flex">
                <Form.Item
                  label="Họ tên"
                  name="name"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                  style={{ flex: 1, marginRight: '8px' }} 
                >
                  <Input className="custom-input" placeholder="Nhập họ tên" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                  style={{ flex: 1 }} 
                >
                  <Input className="custom-input" placeholder="Nhập số điện thoại" />
                </Form.Item>
              </div>
              <Form.Item
                label="Tỉnh/Thành phố"
                name="province"
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
              >
                <Select
                  className="custom-select"
                  value={selectedProvince || ''}
                  onChange={handleProvinceChange}
                  placeholder="Chọn tỉnh/thành phố"
                >
                  <Select.Option value="">Chọn tỉnh/thành phố</Select.Option>
                  {data.province.map(province => (
                    <Select.Option key={province.idProvince} value={province.idProvince}>
                      {province.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Huyện/Quận"
                name="district"
                rules={[{ required: true, message: 'Vui lòng chọn huyện/quận!' }]}
              >
                <Select
                  className="custom-select"
                  value={selectedDistrict || ''}
                  onChange={handleDistrictChange}
                  disabled={!selectedProvince}
                  placeholder="Chọn huyện/quận"
                >
                  <Select.Option value="">Chọn huyện/quận</Select.Option>
                  {districts.map(district => (
                    <Select.Option key={district.idDistrict} value={district.idDistrict}>
                      {district.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Xã/Phường"
                name="ward"
                rules={[{ required: true, message: 'Vui lòng chọn xã/phường!' }]}
              >
                <Select
                  className="custom-select"
                  value={selectedCommune || ''}
                  onChange={(value) => setSelectedCommune(value)}
                  disabled={!selectedDistrict}
                  placeholder="Chọn xã/phường"
                >
                  <Select.Option value="">Chọn xã/phường</Select.Option>
                  {communes.map(commune => (
                    <Select.Option key={commune.idCommune} value={commune.idCommune}>
                      {commune.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Tên đường"
                name="street"
              >
                <Input className="custom-input" placeholder="Nhập tên đường/số nhà..." />
              </Form.Item>

              <Form.Item 
                label="Phương thức thanh toán"
                name="payment"
                rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
              >
                <Radio.Group
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod}
                  className="w-full"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center border p-2 cursor-pointer relative">
                      <Radio value="creditCard" className="mr-2 custom-input"><span>Thẻ tín dụng</span></Radio>   
                      <Image src={images.visa} alt="visa" className="absolute w-10 right-2 h-8" />                   
                    </div>
                    {paymentMethod === 'creditCard' && (
                      <div className='border p-2'>
                        <Form.Item 
                          label="Số thẻ"
                          name="cardNumber"
                          rules={[
                            { required: true, message: 'Vui lòng nhập số thẻ!' },
                            { len: 16, message: 'Số thẻ phải có đúng 16 số!' },
                          ]}
                        >
                          <Input className="custom-input" placeholder="Nhập số thẻ" maxLength={16} />
                        </Form.Item>

                        <div className='flex'>
                          <Form.Item 
                            label="Ngày hết hạn"
                            name="expirationDate"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày hết hạn!' }]}
                            style={{ flex: 1, marginRight: '8px' }} 
                          >
                            <Input className="custom-input" placeholder="MM/YYYY" maxLength={7} />
                          </Form.Item>
                          <Form.Item 
                            label="Tên thẻ"
                            name="cardName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên thẻ!' }]}
                            style={{ flex: 1 }} 
                          >
                            <Input className="custom-input" placeholder="Tên thẻ" />
                          </Form.Item>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center border p-2 cursor-pointer">
                      <Radio value="cash" className="mr-2 custom-input"><span>Tiền mặt (Thanh toán khi nhận hàng)</span></Radio>
                    </div>
                  </div>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <button 
                  type="submit" 
                  disabled={loading || !isAuth}
                  className={`w-full h-14 py-2 text-yellow-200 bg-black transition duration-200 ease-in-out 
                    ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-yellow-300'}`}
                >
                  {loading ? 'Đang thanh toán...' : 'Thanh toán'}
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="w-1/2 h-full">
          {isAuth ? (
            cartItems && cartItems.length > 0 ? (
              <div className='w-4/5 p-8'>
                {cartItems.map(item => (
                  <div key={item.productId} className="flex justify-between items-center mb-4 pb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 mr-4">
                        <Image
                          src={item?.thumbnail}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="text-md font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">Giá: {VND.format(item.price)}</p>
                        <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-300">
                  <p className="mt-4 text-md">Tiền hàng: {VND.format(total.totalPrice)}</p>
                  <p className="mt-1 text-md">Phí ship: {VND.format(total.freeShip)}</p>
                  <p className="mt-1 text-md">Tổng cộng: {VND.format(total.totalCheckout)}</p>
                </div>
              </div>
            ) : (
              <p>Chưa có sản phẩm để thanh toán.</p>
            )
          ) : (
            <p className="text-red-500 p-5">Bạn cần đăng nhập trước.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkouts