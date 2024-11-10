'use client'

import images from '@/public/images'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

const Slider = () => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  }

  return (
    <div className="w-full">
      <div className="relative w-full" style={{ paddingBottom: '40%' }}>
        <Image
          src={images.whiteBg}
          alt='Slider Image'
          layout="fill"  
          objectFit="cover"
        />
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-1/2">
          <h1 className="text-3xl font-bold text-black mb-4">DAO TRỌNG BÌNH</h1>
          <p className="text-xl mb-14 text-gray-800">Người giúp việc nhiệt tình cho gian bếp của bạn</p>
          <div className="left-0 top-1/2 transform -translate-y-1/2 translate-x-1/3">
            <Link href={'/products'} className="inline-block bg-black text-yellow-200 py-2 px-4 rounded hover:text-yellow-300 transition duration-300">
                Mua ngay
            </Link>
          </div>
        </div>
        <div className={`absolute top-0 right-0 w-[50%] h-full transition-all duration-1000 ease-out
          ${loaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-[100%]'}`}>
          <Image
            src={images.sliderImg}
            alt="Slider Image"
            layout="fill"
            objectFit="contain"
            onLoadingComplete={handleImageLoad} 
          />
        </div>
      </div>
    </div>
  )
}

export default Slider