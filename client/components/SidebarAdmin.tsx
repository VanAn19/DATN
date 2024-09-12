import Link from 'next/link';
import { useState } from 'react';
import { AppstoreOutlined, MenuUnfoldOutlined, FileTextOutlined, AreaChartOutlined } from '@ant-design/icons';

const SidebarAdmin = () => {
  const [activeItem, setActiveItem] = useState('');

  const menuItems = [
    { label: 'Sản phẩm', link: '/admin/products', component: AppstoreOutlined },
    { label: 'Danh mục', link: '/admin/categories', component: MenuUnfoldOutlined },
    { label: 'Đơn hàng', link: '/admin/orders', component: FileTextOutlined },
    { label: 'Thống kê', link: '/admin/stats', component: AreaChartOutlined },
  ];

  return (
    <aside className="w-64 bg-gray-100 h-screen fixed top-5 left-0 pt-16 p-4 shadow-lg">
      <div className="text-xl font-bold mb-4">Quản lý</div>
      <ul className="mb-8">
        {menuItems.map((item, index) => {
          const IconComponent = item.component;
          return (
            <li key={index} className={`mb-4 ${activeItem === item.link ? 'text-blue-500' : 'text-gray-700'}`}>
              <Link href={item.link}>
                <p onClick={() => setActiveItem(item.link)} className="cursor-pointer flex items-center gap-3 p-2 rounded hover:bg-gray-200">
                  <IconComponent className="text-gray-500" style={{ fontSize: '20px' }} />
                  <span>{item.label}</span>
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  );
};

export default SidebarAdmin;