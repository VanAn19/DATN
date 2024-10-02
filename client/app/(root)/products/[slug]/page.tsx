'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ProductPage from '@/components/ProductPage'
import { useParams } from 'next/navigation'
import React from 'react'

const Product = () => {
  const params = useParams();  
  const slug = params?.slug as string;
  const productId = slug.split('.').pop() || '';
  
  return (
    <div className='flex justify-center items-center '>
      <ProductPage productId={productId} />
    </div>
  )
}

export default Product