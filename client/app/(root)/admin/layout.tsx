'use client'

import Header from '@/components/Header';
import SidebarAdmin from '@/components/SidebarAdmin';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <SidebarAdmin />
        <main className="flex-grow p-6 ml-[250px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
