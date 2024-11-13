import React from 'react'
import Image from 'next/image'

const Loader = () => {
  return (
    <div className='flex justify-center items-center'>
      <Image
        src="/images/logo.svg"
        alt="Loader"
        width={32}
        height={32}
        className='animate-spin'
      />
      Loading...
    </div>
  )
}

export default Loader