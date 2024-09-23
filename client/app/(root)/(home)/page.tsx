import React from 'react'
import BestSellingProductSlider from '@/components/BestSellingProductSlider';

const Home = () => {
  return (
    <div className='flex-col w-[90%]'>
      <div className='w-full pt-5'>
        <BestSellingProductSlider />
      </div>
    </div>
  )
}

export default Home