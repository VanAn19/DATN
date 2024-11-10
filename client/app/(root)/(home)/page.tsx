import React from 'react';
import BestSellingProductSlider from '@/components/BestSellingProductSlider';
import Introduction from '@/components/Introduction';
import Slider from '@/components/Slider';

const Home = () => {
  return (
    <>
      <Slider />
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