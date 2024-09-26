'use client'

import React, { useEffect, useState } from 'react'
import DashboardCard from '@/components/DashboardCard';
import { AppstoreOutlined, MenuUnfoldOutlined, FileTextOutlined, AreaChartOutlined } from '@ant-design/icons';
import { checkRoleAdmin, getCookie } from '@/utils';
import { notFound } from 'next/navigation';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const result = checkRoleAdmin();
    setIsAdmin(result);
    if (result === false) {
      notFound();
    }
  }, []);

  const cardData = [
    {
      title: "Sản phẩm",
      count: 100,
      icon: <AppstoreOutlined className="text-slate-500" style={{ fontSize: '72px' }} />,
      link: '/admin/products'
    },
    {
      title: "Danh mục",
      count: 12,
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
      title: "Thống kê",
      count: 750,
      icon: <AreaChartOutlined className="text-slate-500" style={{ fontSize: '72px' }} />,
      link: '/admin/stats'
    }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
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