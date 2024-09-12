import React from 'react'
import DashboardCard from '@/components/DashboardCard';
import { Utensils, Folder, ReceiptText, ChartNoAxesCombined } from 'lucide-react';

const Admin = () => {
  const cardData = [
    {
      title: "Sản phẩm",
      count: 100,
      icon: <Utensils className="text-slate-500" size={72} />,
      link: '/admin/products'
    },
    {
      title: "Danh mục",
      count: 12,
      icon: <Folder className="text-slate-500" size={72} />,
      link: '/admin/categories'
    },
    {
      title: "Đơn hàng",
      count: 12,
      icon: <ReceiptText className="text-slate-500" size={72} />,
      link: '/admin/orders'
    },
    {
      title: "Thống kê",
      count: 750,
      icon: <ChartNoAxesCombined className="text-slate-500" size={72} />,
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