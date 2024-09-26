'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function CenteredLayouts({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex pt-[var(--header-height)] font-poppins">
        <div className="flex flex-col items-center justify-center transition-all duration-300 ml-0 w-full">
          {children}
        </div>
      </div>
      <div className='transition-all duration-300 w-[100%] flex justify-center'>
        <Footer />
      </div>
    </div>
  );
}