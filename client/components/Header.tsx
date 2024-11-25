'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import {
    MenuOutlined,
    SearchOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import { Divider, Dropdown, Modal, Space, Spin, Button } from "antd";
import Link from 'next/link';
import MainMenu from './MainMenu';
import { checkAvailableLogin, checkTokenCookie, getCookie, clearAllCookies } from '@/utils';
import Image from 'next/image';
import images from '@/public/images';
import { logout } from '@/api/auth';
import { useDispatch } from "react-redux";
import { DELETE_VALUE_USER } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import Cart from './Cart';
import { User } from '@/utils/user';
import '../styles/home/header.scss'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [infoUser, setInfoUser] = useState<User | undefined>(undefined);
  const dispatch = useDispatch();
  const router = useRouter();
  // const isAuth = checkAvailableLogin();
  // const infoUser = getCookie('user');

  useEffect(() => {
    setIsAuth(checkAvailableLogin());
    setInfoUser(getCookie('user'));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false); 
  }

  const toggleCart = () => {
    setIsCartOpen(!isMenuOpen);
  }

  const closeCart = () => {
    setIsCartOpen(false); 
  }

  const handleLogout = async (e: FormEvent) => {
    try {
      await logout();
      clearAllCookies();
      document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      dispatch(DELETE_VALUE_USER());
      router.push('/sign-in');
      // window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  const iconsMenu = [
    { component: MenuOutlined, key: 'menu' },
    // { component: SearchOutlined, key: 'search' }
  ]

  const itemsDropdowUser = [
    { 
      label: (
        <Link href={"/profile"} className="list-item">
          <p className="item-text">Thông tin cá nhân</p>
        </Link>
      ),
      key: 'profile'
    },
    { 
      label: (
        <Link href={"/liked-products"} className="list-item border-t border-b">
          <p className="item-text">Sản phẩm đã thích</p>
        </Link>
      ),  
      key: 'liked-products'
    },
    { 
      label: (
        <Link href={"/purchase"} className="list-item border-b">
          <p className="item-text">Đơn hàng của tôi</p>
        </Link>
      ), 
      key: 'orders'
    },
    { 
      label: (
        <Link href={"/purchase"} className="list-item border-b">
          <p className="item-text">Đổi mật khẩu</p>
        </Link>
      ), 
      key: 'orders'
    },
    { 
      label: (
        <div className="list-item" onClick={handleLogout}>
          <p className="item-text">Đăng xuất</p>
        </div>
      ),
      key: 'logout',
    }
  ]

  return (
    <div className='fixed w-full z-50 flex items-center h-[--header-height] px-1 mobile:px-6 shadow-xl bg-white'>
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
        <MainMenu onClose={closeMenu} />
      )}

      <div className="flex-grow text-center font-bold text-xl">
        <Link href="/">DAO TRỌNG BÌNH</Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="p-1 mobile:p-3">
          <button onClick={toggleCart}>
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
          </button>
        </div>
        {isAuth ? (
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            arrow={true}
            dropdownRender={() => (
              <div
                style={{
                  maxHeight: "400px",
                  background: "white",
                  overflowY: "auto",
                  borderRadius: "10px",
                  scrollbarWidth: "thin",
                  // scrollbars: "false",
                }}
              >
                {infoUser && infoUser?.role === 'admin' && (
                  <Link href={"/admin"} className="list-item border-b">
                    <p className="item-text">Trang quản lý</p>
                </Link>
                )}
                {itemsDropdowUser.map((item) => (
                  <div key={item.key}>{item.label}</div>
                ))}
              </div>
            )}
          >
            <div
                style={{
                  cursor: "pointer",
                }}
              >
                <Space>
                  <div className="w-10 h-10 rounded-full overflow-hidden m-5">
                    <Image
                      className="w-full h-full object-cover rounded-full"
                      alt="User Avatar"
                      src={infoUser?.avatar || images.logo} 
                      width={40}
                      height={40}
                    />
                  </div>
                </Space>
              </div>
          </Dropdown>
        ) : (
          <Link href="/sign-in">
            <button className="px-4 py-2 mr-[15px] bg-black text-yellow-200 hover:text-yellow-300 rounded">
              Đăng nhập
            </button>
          </Link>
        )}
      </div>

      {isCartOpen && (
        <Cart onClose={closeCart} />
      )}
    </div>
  )
}

export default Header