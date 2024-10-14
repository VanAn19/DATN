'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ThanksPage = () => {
  return (
    <div>
      <header className="h-24 flex items-center justify-center bg-white border-b border-gray-300">
        <Link className='m-0 text-xl font-bold' href="/">DAO TRỌNG BÌNH</Link>
      </header>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Cảm ơn bạn đã tin dùng sản phẩm của chúng tôi!</h1>
        <p className="text-lg mb-6">
            Thanh toán của bạn đã được thực hiện thành công. Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập tức.
        </p>
        <Link href='/' className="block w-1/6 py-2 bg-black text-yellow-200 rounded text-center">
          Trở về trang chủ
        </Link>
      </div>
    </div>
  )
}

export default ThanksPage