import Link from 'next/link';
import { useState } from 'react';

const SidebarAdmin = () => {
  const [activeItem, setActiveItem] = useState('');

  const menuItems = [
    { label: 'Sản phẩm', link: '/admin/products' },
    { label: 'Danh mục', link: '/admin/categories' },
    { label: 'Thống kê', link: '/admin/stats' },
  ];

  return (
    <aside className="w-64 bg-gray-100 h-screen fixed top-5 left-0 pt-16 p-4 shadow-lg">
      <div className="text-xl font-bold mb-4">Quản lý</div>
      <ul className="mb-8">
        {menuItems.map((item, index) => (
          <li key={index} className={`mb-4 ${activeItem === item.link ? 'text-blue-500' : 'text-gray-700'}`}>
            <Link href={item.link}>
              <p onClick={() => setActiveItem(item.link)} className="cursor-pointer flex justify-between items-center">
                {item.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarAdmin;