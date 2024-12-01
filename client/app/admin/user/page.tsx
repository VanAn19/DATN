'use client'

import { getAllUserByAdmin, getListSearchUserByAdmin, updateStatusUser } from '@/api/user';
import { Button, Card, Input, Modal, notification, Select, Table, Tag } from 'antd'
import { format } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { UserStatus } from '@/types/user';
import debounce from 'lodash.debounce';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import AddNewUser from '@/components/AddNewUser';

const userStatusOptions = [
  { label: 'Hoạt động', value: 'active' },
  { label: 'Vô hiệu hóa', value: 'disabled' }
];

const AdminUser = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isAddUserVisible, setIsAddUserVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUserByAdmin();
      setUsers(res.metadata);
    } catch (error) {
      console.error("Error during fetch all user: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.trim()) {
        setLoading(true);
        try {
          const res = await getListSearchUserByAdmin(value);
          setUsers(res.metadata);
        } catch (error) {
          console.error("Error during search product: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        const res = await getAllUserByAdmin();
        setUsers(res.metadata);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  const handleStatusChange = async (username: string, newStatus: UserStatus) => {
    setLoading(true);
    try {
      const res = await updateStatusUser({
        username,
        newStatus
      });
      console.log(res)
      if (res.status === 200) {
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật trạng thái người dùng thành công.',
        });
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.username === username ? { ...user, status: newStatus } : user
          )
        );
      }
    } catch (error: any) {
      console.error("Error during update order status: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenAddUser = () => {
    setIsAddUserVisible(true);
  };

  const handleCloseAddUser = () => {
    setIsAddUserVisible(false);
  };

  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: any) => {
        const roleLabels: Record<string, string> = {
          admin: 'Quản trị viên',
          employee: 'Nhân viên',
          user: 'Người dùng',
        };

        const colorMap: Record<string, string> = {
          admin: 'success',
          employee: 'warning',
          user: 'default',
        };

        return (
          <Tag className="text-xs" color={colorMap[role]}>
            {roleLabels[role]}
          </Tag>
        );
      }
    },
    {
      title: 'Đăng nhập lần cuối',
      dataIndex: 'activeTime',
      key: 'activeTime',
      render: (activeTime: any) => (
        <div>{format(activeTime, 'dd/MM/yyyy HH:mm:ss')}</div>
      )
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render: (status: UserStatus, user: any) => (
        <Select
          value={status}
          onChange={(newStatus) => handleStatusChange(user.username, newStatus)}
          options={userStatusOptions}
          style={{ width: 150 }}
        />
      ),
    },
  ];

  return (
    <div className='p-4'>
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Danh sách người dùng</span>
            <Input
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder='Tìm theo tên người dùng, tên đăng nhập, email...'
              prefix={<SearchOutlined style={{ cursor: 'pointer' }} />}
              className='w-2/3'
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAddUser}>
              Thêm người dùng mới
            </Button>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey={(user: any) => user._id}
          pagination={{ pageSize: 10 }}
          className='custom-table-header border rounded-lg'
          bordered
        />
      </Card >
      <Modal
        title={<span className="text-xl font-bold text-black">Thêm người dùng mới</span>}
        open={isAddUserVisible}
        onCancel={handleCloseAddUser}
        footer={null}
      >
        <AddNewUser onClose={handleCloseAddUser} onAddSuccess={fetchUsers} />
      </Modal>
    </div>
  )
}

export default AdminUser