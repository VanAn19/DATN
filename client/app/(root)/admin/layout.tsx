'use client'

import SidebarAdmin from '@/components/SidebarAdmin';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <SidebarAdmin />
        <div className="flex-grow p-6 ml-[250px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
