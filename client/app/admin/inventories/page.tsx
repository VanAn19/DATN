'use client'

import { Button, Input, Modal, Table } from 'antd'
import Link from 'next/link'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import { getListSearchStock, getStock } from '@/api/inventory';
import debounce from 'lodash.debounce';
import AddProductInventory from '@/components/AddProductInventory';

const AdminInventory = () => {
  const [stocks, setStocks] = useState([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isAddInventoryVisible, setIsAddInventoryVisible] = useState(false);

  useEffect(() => {
    const fetchStock = async () => {
      setLoading(true);
      try {
        const res = await getStock();
        if (res.status === 200) {
          setStocks(res.metadata);
        }
      } catch (error) {
        console.error("Error during fetch stock: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.trim()) {
        setLoading(true);
        try {
          const res = await getListSearchStock(value);
          if (res.status === 200) {
            setStocks(res.metadata);
          }
        } catch (error) {
          console.error("Error during search product: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        const res = await getStock();
        if (res.status === 200) {
          setStocks(res.metadata);
        }
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  const handleOpenAddInventory = () => {
    setIsAddInventoryVisible(true);
  };

  const handleCloseAddInventory = () => {
    setIsAddInventoryVisible(false);
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, stocks: any) => (
        <div className='flex'>
          <Image
            src={stocks.productId.thumbnail} 
            alt={stocks.productId.name} 
            width={100} 
            height={100} 
          />
          <div className='ml-5'>{stocks.productId.name}</div>
        </div>
      ),
    },
    {
      title: 'Hàng tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <div>{stock}</div>
      ),
      sorter: (a: any, b: any) => a.stock - b.stock,
    },
    {
      title: 'Đã bán',
      dataIndex: 'soldQuantity',
      key: 'soldQuantity',
      render: (soldQuantity: number) => (
        <div>{soldQuantity}</div>
      ),
      sorter: (a: any, b: any) => a.soldQuantity - b.soldQuantity,
    },
  ]
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input 
          value={searchValue}
          onChange={handleSearchInputChange}
          placeholder='Tìm theo tên sản phẩm...' 
          prefix={<SearchOutlined style={{ cursor: 'pointer' }} />}
          className='w-2/3'
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAddInventory}>
          Nhập hàng tồn kho
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={stocks}
        loading={loading}
        rowKey={(stocks: any) => stocks._id}
        pagination={{ pageSize: 10 }}
        className='custom-table-header'
      />
      <Modal
        title="Nhập hàng tồn kho"
        open={isAddInventoryVisible}
        onCancel={handleOpenAddInventory}
        footer={null} // Nếu không muốn có footer, để footer = null
      >
        <AddProductInventory onClose={handleCloseAddInventory} />
      </Modal>
    </div>
  )
}

export default AdminInventory