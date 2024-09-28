'use client'

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SidebarAdmin from '@/components/SidebarAdmin';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=''>
      <Header />
      <div className="flex pt-[var(--header-height)]">
        <SidebarAdmin />
        <div className="flex-grow ml-[255px] min-h-screen">
          {children}
          {/* <Footer /> */}
        </div>
      </div>
      {/* <div className='transition-all duration-300 w-[100%] flex justify-center'>
        <Footer />
      </div> */}
    </div>
  );
};

export default AdminLayout;
