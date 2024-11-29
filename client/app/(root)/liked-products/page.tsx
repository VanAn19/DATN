'use client'

import { getUserFavorite, removeProductFromFavorite } from '@/api/favorite';
import { Product } from '@/types';
import { Button, Card, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined, HeartFilled } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '@/api/cart';
import { checkAvailableLogin } from '@/utils';
import { useRouter } from 'next/navigation';
import TruncatedText from '@/components/ui/TruncatedText';

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const LikedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false); 
  const router = useRouter();

  useEffect(() => {
    const isAuth = checkAvailableLogin();
    if (!isAuth) {
      router.push('/sign-in');
    } else {
      setIsAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    if (!isAuthChecked) return;
    setLoading(true);
    const fetchFavorProduct = async () => {
      try {
        const res = await getUserFavorite();
        if (res.status === 200) {
          setProducts(res.metadata.products);
        }
      } catch (error) {
        console.error("Error during fetch favorite products: ", error);
      } finally {
        setLoading(false);
      }     
    }
    fetchFavorProduct();
  }, [isAuthChecked])

  const addProductToCart = async (product: Product) => {
    setLoading(true);
    try {
      const payload = {
        productId: product._id,
        quantity: 1,
        name: product.name,
        price: product.sellingPrice,
        thumbnail: product.thumbnail
      }
      const res = await addToCart(payload);
      if (res.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Đã thêm sản phẩm vào giỏ hàng!',
        });
      }
    } catch (error) {
      console.error("Error during add products to cart: ", error);
    } finally {
      setLoading(false);
    }
  }

  const unFavorProduct = async (productId: string) => {
    setLoading(true);
    try {
      const res = await removeProductFromFavorite(productId);
      if (res.status === 200) {
        setProducts((prevProducts) => 
          prevProducts.filter(product => product._id !== productId)
        );
      }
    } catch (error) {
      console.error("Error during unfavor product: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[80%] container mx-auto mb-8">
      <div className='mt-8 font-extrabold text-center mb-4'>SẢN PHẨM YÊU THÍCH</div>
        {products.map((product) => (
          <Card 
            key={product._id}
            actions={[
              <Button key={1} icon={<ShoppingCartOutlined />} type="primary" onClick={() => addProductToCart(product)}>
                Thêm vào giỏ hàng
              </Button>,
              <Button key={2} icon={<HeartFilled />} type="default" onClick={() => unFavorProduct(product._id)}>
                Bỏ thích
              </Button>,
            ]}
            className="hover:shadow-lg transition-shadow duration-300 mb-4"
          >
            <div className='flex mb-2'>
              <div className="mr-4">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={100}
                  height={100}
                />
              </div>
              <Link href={`/products/${product.slug}`} className="flex-1 ml-4">  
                <p className="text-lg font-bold">{product.name}</p> 
                <div className="flex items-center w-full"> 
                  <p className="text-gray-500">Đơn giá: </p> 
                  <p className="text-gray-500 ml-1 mr-1">{VND.format(product.sellingPrice)}</p> 
                  <p className="text-gray-500 line-through">{VND.format(product.price)}</p> 
                </div>
                <TruncatedText text={product.description} maxLength={200} />
              </Link>
            </div>
          </Card>
        ))}
    </div>
  )
}

export default LikedProducts