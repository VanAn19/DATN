import React, { useEffect, useState } from 'react'
import { CloseOutlined, PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import Link from 'next/link';
import Image from 'next/image';
import { decreaseQuantityCartItem, deleteCartItem, getListCart, increaseQuantityCartItem } from '@/api/cart';
import { ProductCart } from '@/types';
import images from '@/public/images';
import { checkAvailableLogin } from '@/utils';
import { checkoutReview } from '@/api/order';

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

interface CartProps {
  onClose: () => void; 
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const isAuth = checkAvailableLogin();
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [totalCheckout, setTotalCheckout] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

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
        }
      }
      fetchCart();
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
          setTotalCheckout(responseCheckout.metadata.checkoutOrder.totalCheckout);
        } catch (err) {
          console.error("Failed to fetch checkout review:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    getCheckout();
  }, [cartId, cartItems]);

  const increaseQuantity = async (id: string) => {
    setLoading(true);
    try {
      const res = await increaseQuantityCartItem(id);
      setCartItems(res.metadata.products);
    } catch (error) {
      console.error('Error during increase quantity: ', error);
    } finally {
      setLoading(false);
    }
  }

  const decreaseQuantity = async (id: string) => {
    setLoading(true);
    try {
      const res = await decreaseQuantityCartItem(id);
      setCartItems(res.metadata.products);
    } catch (error) {
      console.error('Error during decrease quantity: ', error);
    } finally {
      setLoading(false);
    }
  }

  const removeCartItem = async (productId: string) => {
    setLoading(true);
    try {
      await deleteCartItem(productId);
      setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error("Error during remove cart item: ", error);
    } finally {
      setLoading(false);
    }
  }

//   useEffect(() => {
//     document.body.classList.add('overflow-hidden');
//     return () => {
//       document.body.classList.remove('overflow-hidden');
//     };
//   }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-80 z-40" onClick={onClose}></div>     
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Giỏ hàng</h2>
          <button onClick={onClose} className="text-xl">
            <CloseOutlined />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh_-_150px)]">
          {isAuth ? (
            cartItems && cartItems.length > 0 ? (
              <div>
                {cartItems.map(item => (
                  <div key={item.productId} className="flex justify-between items-center mb-4 border-b pb-4">
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
                        <p className="text-sm font-semibold text-gray-800 mt-1">
                          Tổng: {VND.format(item.price * item.quantity)}
                        </p>
                        <div className="flex items-center mt-2">
                          <button onClick={() => decreaseQuantity(item.productId)} className="p-1 border rounded">
                            <MinusOutlined />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.productId)} className="p-1 border rounded">
                            <PlusOutlined />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => removeCartItem(item.productId)} className="ml-4 text-red-500">
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-4 text-right">
                  <p className="text-lg font-bold">Tổng cộng: {VND.format(totalCheckout)}</p>
                </div>

                <div className="mt-4">
                  <button className="w-full py-2 bg-black text-yellow-200 rounded">
                    Thanh toán
                  </button>
                </div>
              </div>
            ) : (
              <p>Chưa có sản phẩm trong giỏ hàng.</p>
            )
          ) : (
            <p className="text-red-500">Bạn cần đăng nhập để mua hàng.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
