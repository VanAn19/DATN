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
    <div className="w-full relative">
      <div className="relative w-full" style={{ paddingBottom: '40%' }}>
        <Image
          src={images.whiteBg}
          alt="Slider Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 max-w-lg ml-20">
        <h1 className="text-4xl font-bold text-black mb-6">DAO TRỌNG BÌNH</h1>
        <p className="text-lg text-gray-800 mb-6">
          Tinh Hoa Nghệ Thuật, Sắc Bén Mỗi Ngày. Chúng tôi cam kết mang đến những sản phẩm dao chất lượng vượt trội, kết hợp hoàn hảo giữa truyền thống và công nghệ hiện đại, giúp nâng tầm trải nghiệm ẩm thực và tối ưu công việc của bạn.
        </p>
        <Link href={'/products'} className='ml-20'>
          <button className="bg-black text-yellow-200 py-2 px-6 rounded hover:text-yellow-300 transition duration-300">
            Mua ngay
          </button>
        </Link>
      </div>

      <div
        className={`absolute top-0 right-0 w-[50%] h-full transition-all duration-1000 ease-out ${loaded ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-[100%]'
          }`}
      >
        <Image
          src={images.sliderImg}
          alt="Slider Image"
          layout="fill"
          objectFit="contain"
          onLoadingComplete={handleImageLoad}
        />
      </div>
    </div>
  );
};

export default Slider;
