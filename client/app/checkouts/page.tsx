'use client'

import { getListCart } from '@/api/cart';
import { checkoutReview } from '@/api/order';
import Loader from '@/components/Loader';
import { CheckoutTotal, ProductCart } from '@/types';
import { checkAvailableLogin } from '@/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import data from '@/data/db.json'
import Link from 'next/link';

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const Checkouts = () => {
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

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    const filteredDistricts = data.district.filter(district => district.idProvince === provinceId);
    setDistricts(filteredDistricts);
    setSelectedDistrict(null);
    setCommunes([]);
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    const filteredCommunes = data.commune.filter(commune => commune.idDistrict === districtId);
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

  return (
    <div>
      <header className="h-24 flex items-center justify-center bg-white border-b border-gray-300">
        <Link className='m-0 text-xl font-bold' href="/">DAO TRỌNG BÌNH</Link>
      </header>
      <div className="flex">
        <div className="xl:w-[50%] w-1/2 bg-white h-screen ">
          <div className='w-4/5 p-8'>
            <p className='text-xl mb-4'>Vận chuyển</p>
            <div className='mb-4'>
              <label htmlFor="name" className="block text-md font-medium text-gray-700">Họ tên</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                placeholder="Nhập họ tên"
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="phone" className="block text-md font-medium text-gray-700">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="province" className="block text-md font-medium text-gray-700">Tỉnh/Thành phố</label>
              <select
                id="province"
                value={selectedProvince || ''}
                onChange={handleProvinceChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {data.province.map(province => (
                  <option key={province.idProvince} value={province.idProvince}>{province.name}</option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor="district" className="block text-md font-medium text-gray-700">Huyện/Quận</label>
              <select
                id="district"
                value={selectedDistrict || ''}
                onChange={handleDistrictChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                disabled={!selectedProvince}
              >
                <option value="">Chọn huyện/quận</option>
                {districts.map(district => (
                  <option key={district.idDistrict} value={district.idDistrict}>{district.name}</option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor="ward" className="block text-md font-medium text-gray-700">Xã/Phường</label>
              <select
                id="ward"
                value={selectedCommune || ''}
                onChange={(e) => setSelectedCommune(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                disabled={!selectedDistrict}
              >
                <option value="">Chọn xã/phường</option>
                {communes.map(commune => (
                  <option key={commune.idCommune} value={commune.idCommune}>{commune.name}</option>
                ))}
              </select>
            </div>

            <div className='mb-4'>
              <label htmlFor="street" className="block text-md font-medium text-gray-700">Tên đường <span className='text-xs italic'>(Tùy chọn...)</span></label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border rounded-md"
                placeholder="Nhập tên đường/số nhà..."
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-gray-100 h-screen border-l border-gray-300">
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
            <p className="text-red-500">Bạn cần đăng nhập trước.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkouts