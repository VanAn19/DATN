'use client'

import ProductPage from '@/components/ProductPage'
import { useParams } from 'next/navigation'
import React from 'react'

const Product = () => {
  const slug = useParams();

  return (
    <div className="flex-col w-[90%] mb-[100px]">
      <ProductPage productId='' />
    </div>
  )
}

export default Product