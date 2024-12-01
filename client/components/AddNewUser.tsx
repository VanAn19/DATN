import { addNewUserByAdmin } from '@/api/user';
import { Button, Col, Form, Input, InputNumber, message, Modal, notification, Row, Select } from 'antd';
import React, { useState } from 'react'

interface AddNewUserProps {
  onClose: () => void;
  onAddSuccess: () => void;
}

const AddNewUser: React.FC<AddNewUserProps> = ({ onClose, onAddSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await addNewUserByAdmin(values);
      if (res.status === 200) {
        notification.success({
          message: 'Thành công',
          description: 'Thêm mới người dùng thành công.',
        });
        form.resetFields();
        onClose();
        onAddSuccess();
      }
    } catch (error: any) {
      console.error('Error during add new user by admin:', error);
      message.error(error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Tên đăng nhập là bắt buộc' }]}
          >
            <Input placeholder="Nhập tên đăng nhập" className='custom-input' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: 'Số điện thoại là bắt buộc' },
              {
                pattern: /^((\+84|0)[3|5|7|8|9])+([0-9]{8})$/,
                message: 'Số điện thoại không hợp lệ',
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" className='custom-input' />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={16}>
          <Form.Item
            label="Họ tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ tên" className='custom-input' />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Quyền"
            name="role"
            rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}
          >
            <Select
              className='custom-select'
              placeholder="Chọn quyền"
              options={[
                { label: 'Quản trị viên', value: 'admin' },
                { label: 'Nhân viên', value: 'employee' },
                { label: 'Khách hàng', value: 'user' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Email là bắt buộc' },
          { type: 'email', message: 'Email không hợp lệ' },
        ]}
      >
        <Input placeholder="Nhập email" className='custom-input' />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          { required: true, message: 'Mật khẩu là bắt buộc' },
          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
          { max: 18, message: 'Mật khẩu không được quá 18 ký tự' },
        ]}
      >
        <Input.Password placeholder="Nhập mật khẩu" className='custom-input' />
      </Form.Item>

      <div className="flex justify-end">
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Hủy
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Lưu
        </Button>
      </div>
    </Form>
  )
}

export default AddNewUser