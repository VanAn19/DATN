import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center justify-center transition-all duration-300 ml-0 w-full'>
        <div className='transition-all duration-300 w-[100%] flex justify-center`'>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home