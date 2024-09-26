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
    console.log('Form Values:', values);
    notification.success({
      message: 'Product Added Successfully!',
    });
  };

  return (
    <div className="w-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-10"> 
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
              {fileList.length < 9 && (
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
            label="Ngành hàng"
            rules={[{ required: true, message: 'Vui lòng chọn ngành hàng!' }]}
          >
            <Select placeholder="Chọn ngành hàng">
              <Option value="electronics">Điện tử</Option>
              <Option value="fashion">Thời trang</Option>
              <Option value="home">Đồ gia dụng</Option>
            </Select>
          </Form.Item>

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