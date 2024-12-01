'use client'

import { Card, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { statisticByProduct, statisticRevenueByDate } from '@/api/statistic';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistic = () => {
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('all');
  const [productStatistics, setProductStatistics] = useState<any[]>([]);
  const [revenueByDateStatistics, setRevenueByDateStatistics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const labels = productStatistics.map(product => product.name);
  const soldQuantities = productStatistics.map((product) => product.soldQuantity);
  const totalRevenues = productStatistics.map((product) => product.totalRevenue / 100000);

  const revenueLabels = revenueByDateStatistics.map((item) => item._id);
  const revenueTotalQuantities = revenueByDateStatistics.map((item) => item.totalQuantity);
  const revenueData = revenueByDateStatistics.map((item) => item.totalRevenue / 100000);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Số lượng đã bán',
        data: soldQuantities,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Doanh thu (Trăm nghìn VND)',
        data: totalRevenues,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueChartData = {
    labels: revenueLabels,
    datasets: [
      {
        label: 'Số lượng',
        data: revenueTotalQuantities,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Doanh thu (Trăm nghìn VND)',
        data: revenueData,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Thống kê sản phẩm' },
    },
    scales: {
      x: { ticks: { autoSkip: false } },
      y: { beginAtZero: true },
    },
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Thống kê doanh thu theo ngày' },
    },
    scales: {
      x: { ticks: { autoSkip: false } },
      y: { beginAtZero: true },
    },
  };

  const chartComponents: Record<string, React.FC<any>> = {
    bar: Bar,
    line: Line,
    pie: Pie,
  };

  const ChartComponent = chartComponents[chartType] || Bar;

  const handleChartTypeChange = (value: string) => {
    setChartType(value);
  };

  useEffect(() => {
    const fetchProductStatistic = async () => {
      setLoading(true);
      try {
        const res = await statisticByProduct();
        if (res.status === 200) {
          setProductStatistics(res.metadata);
        }
      } catch (error) {
        console.error('Error fetching product statistics:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductStatistic();
  }, []);

  useEffect(() => {
    const fetchRevenueStatisticByDate = async () => {
      setLoading(true);
      try {
        const res = await statisticRevenueByDate();
        if (res.status === 200) {
          setRevenueByDateStatistics(res.metadata);
        }
      } catch (error) {
        console.error('Error fetching revenue by date statistics:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRevenueStatisticByDate();
  }, []);

  return (
    <div className="flex flex-col p-4 gap-4">
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Thống kê doanh thu theo sản phẩm</span>
            <div className='flex flex-row gap-4'>
              <Select
                defaultValue="bar"
                onChange={handleChartTypeChange}
                style={{ width: 120 }}
                options={[
                  { value: 'bar', label: 'Biểu đồ cột' },
                  { value: 'line', label: 'Biểu đồ đường' },
                  // { value: 'pie', label: 'Biểu đồ tròn' },
                ]}
              />
              {/* <Select
                defaultValue="all"
                onChange={handleTimeRangeChange}
                style={{ width: 120 }}
                options={[
                  { value: 'all', label: 'Tất cả' },
                  { value: '7days', label: '7 ngày trước' },
                  { value: '1month', label: '1 tháng trước' },
                  { value: '1year', label: '1 năm trước' },
                ]}
              /> */}
            </div>
          </div>
        }
      >
        {productStatistics.length > 0 && (
          <ChartComponent data={chartData} options={options} width={400} height={300} />
        )}
      </Card>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Thống kê doanh thu theo ngày</span>
            <Select
              defaultValue="bar"
              onChange={handleChartTypeChange}
              style={{ width: 120 }}
              options={[
                { value: 'bar', label: 'Biểu đồ cột' },
                { value: 'line', label: 'Biểu đồ đường' },
                // { value: 'pie', label: 'Biểu đồ tròn' },
              ]}
            />
          </div>
        }
      >
        {revenueByDateStatistics.length > 0 && (
          <ChartComponent data={revenueChartData} options={revenueOptions} width={400} height={300} />
        )}
      </Card>
    </div>
  )
}

export default Statistic