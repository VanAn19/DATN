'use client'

import React, { useEffect, useState } from 'react'
import ProductInfo from './ui/ProductInfo'
import { getInfoProduct } from '@/api/product';
import { checkAvailableLogin, getCookie } from '@/utils';

const ProductPage = ({ productId }: { productId: string }) => {
  const [data, setData] = useState({});
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await getInfoProduct(productId);
        setData(res);
        setUser(checkAvailableLogin() ? getCookie('user')._id : '');
        setIsLoading(false);
      } catch (error) {
        console.error("Product page error: ", error);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId])

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 bg-white">
      <ProductInfo data={data} user={user} isLoading={isLoading} />
    </div>
  )
}

export default ProductPage