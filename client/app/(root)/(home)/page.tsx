import React from 'react';
import BestSellingProductSlider from '@/components/BestSellingProductSlider';
import Introduction from '@/components/Introduction';

const Home = () => {
  return (
    <>
      <div className='w-[90%] mx-auto overflow-hidden'>
        <div className='flex justify-center'>
          <BestSellingProductSlider />
        </div>
      </div>
      <Introduction />
    </>
  )
}

export default Home