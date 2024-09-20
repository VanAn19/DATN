'use client'

import React, { useState } from 'react'
import ProductInfo from './ui/ProductInfo'

const ProductPage = ({ productId }: { productId: string }) => {
  const [data, setData] = useState({});
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <ProductInfo data={data} user={user} isLoading={isLoading} />
    </div>
  )
}

export default ProductPage