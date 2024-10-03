'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function CenteredLayouts({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {/* <div className="flex justify-center items-center pt-[var(--header-height)] font-poppins"> */}
      <div className="pt-[var(--header-height)]">
        {children}
      </div>
      <Footer />
      {/* <div className='transition-all duration-300 w-[100%] flex justify-center'>
        <Footer />
      </div> */}
    </div>
  );
}