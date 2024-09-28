'use client'

import React, { useState } from 'react'
import { Form, Input, Button, Upload, Select, notification } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const NewProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  
  const handleImageChange = ({ fileList }: any) => setFileList(fileList);
  
  const onFinish = (values: any) => {
    
  };

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="w-full h-full max-w-7xl bg-white rounded-lg shadow-lg p-10"> 
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="images"
            label="Hình ảnh sản phẩm"
            rules={[{ required: true, message: 'Vui lòng thêm ít nhất 3 hình ảnh!' }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleImageChange}
              beforeUpload={() => false} 
              multiple
            >
              {fileList.length < 8 && (
                <div>               
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Thêm hình ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[
              { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
              { min: 25, max: 100, message: 'Tên sản phẩm phải từ 25 đến 100 ký tự.' }
            ]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Loại"
            rules={[{ required: true, message: 'Vui lòng chọn ngành hàng!' }]}
          >
            <Select placeholder="Chọn ngành hàng">
              <Option value="electronics">Điện tử</Option>
              <Option value="fashion">Thời trang</Option>
              <Option value="home">Đồ gia dụng</Option>
            </Select>
          </Form.Item>

          <div className='flex'>
            <Form.Item
              name="price"
              label="Giá"
              rules={[
                { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                { min: 25, max: 100, message: 'Tên sản phẩm phải từ 25 đến 100 ký tự.' }
              ]}
            >
              <Input placeholder="Nhập giá sản phẩm" />
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Số lượng"
              rules={[
                { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                { min: 25, max: 100, message: 'Tên sản phẩm phải từ 25 đến 100 ký tự.' }
              ]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
              { min: 10, max: 5000, message: 'Tên sản phẩm phải từ 25 đến 100 ký tự.' }
            ]}
          >
            <TextArea placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Lưu & Hiển thị</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default NewProduct