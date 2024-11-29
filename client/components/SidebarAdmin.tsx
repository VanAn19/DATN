import Link from 'next/link';
import { useState } from 'react';
import { AppstoreOutlined, MenuUnfoldOutlined, FileTextOutlined, AreaChartOutlined, UpOutlined, DownOutlined, UserOutlined, CommentOutlined, CarOutlined, DatabaseOutlined } from '@ant-design/icons';
import { getCookie } from '@/utils';

const SidebarAdmin = () => {
  const [activeItems, setActiveItems] = useState<string[]>([]);
  const user = getCookie('user');

  const menuItems = [
    {
      label: 'Quản Lý Sản Phẩm',
      link: '/admin/products',
      component: AppstoreOutlined,
      subItems: [
        { label: 'Tất cả sản phẩm', link: '/admin/products' },
        { label: 'Thêm sản phẩm mới', link: '/admin/products/new' },
        { label: 'Bản nháp của tôi', link: '/admin/products/drafts' },
      ]
    },
    {
      label: 'Quản Lý Danh Mục',
      link: '/admin/categories',
      component: MenuUnfoldOutlined,
      subItems: [
        { label: 'Tất cả danh mục', link: '/admin/categories' },
        { label: 'Thêm danh mục mới', link: '/admin/categories/new' },
      ]
    },
    {
      label: 'Quản Lý Đơn Hàng',
      link: '/admin/orders',
      component: FileTextOutlined,
      subItems: [
        { label: 'Tất cả đơn hàng', link: '/admin/orders' },
        { label: 'Đơn hàng đang xử lý', link: '/admin/orders/processing' },
      ]
    },
    {
      label: 'Quản Lý Hàng Tồn Kho',
      link: '/admin/inventories',
      component: DatabaseOutlined,
      subItems: [
        { label: 'Danh sách hàng tồn kho', link: '/admin/inventories' }
      ]
    },
    {
      label: 'Quản Lý Bình Luận',
      link: '/admin/comments',
      component: CommentOutlined,
      subItems: [
        { label: 'Danh sách bình luận', link: '/admin/comments' }
      ]
    },
    {
      label: 'Thống Kê',
      link: '/admin/stats',
      component: AreaChartOutlined,
      subItems: [
        { label: 'Thống kê', link: '/admin/statistics' },
      ]
    },
  ];

  if (user.role === 'admin') {
    menuItems.push({
      label: 'Quản lý người dùng',
      link: '/admin/user',
      component: UserOutlined,
      subItems: [{ label: 'Danh sách người dùng', link: '/admin/user' }],
    });
  }

  const toggleDropdown = (itemLabel: string) => {
    if (activeItems.includes(itemLabel)) {
      setActiveItems(activeItems.filter(item => item !== itemLabel));
    } else {
      setActiveItems([...activeItems, itemLabel]);
    }
  };

  return (
    <aside className="w-64 bg-white h-full fixed top-5 left-0 pt-16 p-2 shadow-lg overflow-auto thin-scrollbar">
      <ul className="mb-8">
        {menuItems.map((item, index) => {
          const IconComponent = item.component;
          const isActive = activeItems.includes(item.label);
          return (
            <li key={index} className='mb-4'>
              <div
                onClick={() => toggleDropdown(item.label)}
                className={`cursor-pointer flex items-center justify-between gap-3 p-2 rounded hover:bg-gray-200 text-gray-700`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="text-gray-500" style={{ fontSize: '16px' }} />
                  <span style={{ fontSize: '15px' }}>{item.label}</span>
                </div>
                <span style={{ fontSize: '12px' }}>{isActive ? <UpOutlined /> : <DownOutlined />}</span>
              </div>
              {isActive && item.subItems.length > 0 && (
                <ul className="ml-6 mt-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex} className="mb-2">
                      <Link href={subItem.link}>
                        <span className="cursor-pointer text-gray-500 hover:text-blue-500">{subItem.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </aside>
  );
};

export default SidebarAdmin;