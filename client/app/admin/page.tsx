'use client'

import React from 'react'
import DashboardCard from '@/components/DashboardCard';
import { AppstoreOutlined, 
  MenuUnfoldOutlined, 
  FileTextOutlined, 
  AreaChartOutlined, 
  DatabaseOutlined,
  CommentOutlined,
  UserOutlined
} from '@ant-design/icons';

const Admin = () => {
  const cardData = [
    {
      title: "Sản phẩm",
      count: 100,
      icon: <AppstoreOutlined className="text-slate-500" style={{ fontSize: '72px' }} />,
      link: '/admin/products'
    },
    {
      title: "Danh mục",
      count: 3,
      icon: <MenuUnfoldOutlined className="text-slate-500" style={{ fontSize: '72px' }} />,
      link: '/admin/categories'
    },
    {
      title: "Đơn hàng",
      count: 12,
      icon: <FileTextOutlined className="text-slate-500" style={{ fontSize: '72px' }} />,
      link: '/admin/orders'
    },
    {
      title: "Hàng tồn kho",
      count: 28,
      icon: <DatabaseOutlined className="text-slate-500" style={{ fontSize: '72px' }} />,
      link: '/admin/orders'
    },
    {
      title: "Bình luận",
      count: 66,
      icon: <CommentOutlined className="text-slate-500" style={{ fontSize: '72px' }} />,
      link: '/admin/orders'
    },
    {
      title: "Thống kê",
      count: 750,
      icon: <AreaChartOutlined className="text-slate-500" style={{ fontSize: '72px' }} />,
      link: '/admin/stats'
    },
    {
      title: "Tài khoản",
      count: 8,
      icon: <UserOutlined className="text-slate-500" style={{ fontSize: '72px' }} />,
      link: '/admin/orders'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5 p-5">
      {cardData.map((card, index) => (
        <div key={index} className="mt-10"> 
        <DashboardCard
          title={card.title}
          count={card.count}
          icon={card.icon}
          link={card.link}
        />
      </div>
      ))}
    </div>
  )
}

export default Admin