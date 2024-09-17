'use client'

import React, { useState } from 'react'
import {
    MenuOutlined,
    SearchOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import { Divider, Dropdown, Modal, Space, Spin, Button } from "antd";
import "../styles/globals.scss";
import Link from 'next/link';
import MainMenu from './MainMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // const { user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  // console.log(isAuthenticated);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false); 
  }

  const iconsMenu = [
    { component: MenuOutlined, key: 'menu' },
    { component: SearchOutlined, key: 'search' }
  ]

  const itemsDropdowUser = [
    { href: '/profile', label: 'Thông tin cá nhân' },
    { href: '/liked-products', label: 'Sản phẩm đã thích' },
    { href: '/orders', label: 'Đơn hàng của tôi' },
    { href: '/', label: 'Đăng xuất' }
  ]

  return (
    <div className="fixed w-full z-50 flex items-center h-[--header-height] px-1 mobile:px-6 shadow-xl bg-white">
      <div className="flex justify-center items-center">
        {iconsMenu.map(({ component: IconComponent, key }) => (
          <div key={key} className="p-1 mr-4 ml-[15px] icon-primary mobile:p-3">
            <button onClick={toggleMenu}>
              <IconComponent style={{ fontSize: '20px' }} />
            </button>
          </div>
        ))}
      </div>
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <MainMenu onClose={closeMenu} />
        </>
      )}

      <div className="flex-grow text-center font-bold text-xl">
        <Link href="/">DAO TRỌNG BÌNH</Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="p-1 mobile:p-3">
          <button>
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
          </button>
        </div>
        {/* {isAuthenticated ? ( */}
          {/* <div></div> */}
        {/* ) : ( */}
          <>
            <Link href="/sign-in">
              <button className="px-4 py-2 mr-[15px] bg-blue-500 text-white rounded">
                Đăng nhập
              </button>
            </Link>
          </>
        {/* )} */}
      </div>
    </div>
  )
}

export default Header