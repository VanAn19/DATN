import React, { useEffect } from 'react'
import { CloseOutlined } from "@ant-design/icons";
import Link from 'next/link';

interface MainMenuProps {
  onClose: () => void; 
}

const MainMenu: React.FC<MainMenuProps> = ({ onClose }) => {
  const menuItems = [
    { href: '/intro', label: 'Giới thiệu' },
    { href: '/products', label: 'Sản phẩm' },
    { href: '/contact', label: 'Liên hệ' },
    { href: '/instruction-manual', label: 'Hướng dẫn sử dụng và bảo quản' }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-80 z-40" onClick={onClose}></div>     
      <div className="fixed top-0 left-0 h-full w-[375px] bg-white z-50 shadow-lg">
        <div className="flex justify-end p-4">
          <button onClick={onClose}>
            <CloseOutlined style={{ fontSize: '24px' }} />
          </button>
        </div>

        <ul className="p-4">
          {menuItems.map((menuItem) => (
            <li key={menuItem.href} className='p-4 border-b'>
              <Link href={menuItem.href}>{menuItem.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default MainMenu
