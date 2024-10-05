'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Select, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getInfoProduct, updateProduct } from '@/api/product';
import { deleteImage, uploadImages } from '@/api/upload';
import { Category, FileItem } from '@/types';
import { getListCategory } from '@/api/category';
import { useParams } from 'next/navigation';


const { TextArea } = Input;
const { Option } = Select;

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getListCategory();
        if (res.status === 200) {
          setCategories(res.metadata);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProduct = async () => {
      if (id) {
        setLoading(true);
        try {
          const product = await getInfoProduct(id as string);
          setProductId(product._id);
          form.setFieldsValue({
            name: product.name,
            price: product.price,
            sale: product.sale,
            quantity: product.quantity,
            category: product.category,
            description: product.description,
          });
          // setFileList(product.images.map((img: any, index: number) => ({
          //   uid: index.toString(),
          //   name: `image-${index}`,
          //   status: 'done',
          //   publicId: img.publicId,
          //   url: img.imageUrl,
          //   thumbUrl: img.thumbUrl,
          // })));
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCategories();
    fetchProduct();
  }, [id, form]);

  const handleImageChange = async ({ fileList }: any) => {
    setFileList(fileList);
    const files = fileList.map((file: any) => file.originFileObj);
    if (files.length) {
      setUploading(true);
      const formData = new FormData();
      files.forEach((file: any) => {
        formData.append('files', file);
      });
      try {
        const response = await uploadImages(formData);
        setFileList(response.metadata.map((img: any, index: number) => ({
          uid: index.toString(),
          name: `image-${index}`,
          status: 'done',
          publicId: img.publicId,
          url: img.imageUrl,
          thumbUrl: img.thumbUrl,
        })));
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };

  const handleRemove = async (file: any) => {
    try {
      await deleteImage({ publicId: file.publicId });
      setFileList(fileList.filter((item) => item.uid !== file.uid));
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const { name, price, sale, quantity, category, description } = values;
      const images = fileList.map((file) => ({
        publicId: file.publicId,
        imageUrl: file.url || '',
        thumbUrl: file.thumbUrl || ''
      }));
      const thumbnail = images[0]?.thumbUrl; 
      if (!thumbnail) {
        notification.error({
          message: 'Lỗi',
          description: 'Vui lòng thêm ít nhất 1 hình ảnh'
        });
        setUploading(false);
        return;
      }
      const res = await updateProduct(productId as string, {
        name,
        thumbnail,
        images,
        price: Number(price),
        sale: Number(sale),
        quantity: Number(quantity),
        category,
        description
      });
      if (res.status === 201) {
        notification.success({
          message: 'Success',
          description: 'Sản phẩm đã được tạo thành công.',
        });
        form.resetFields(); 
        setFileList([]);
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setErrorMessage("Sản phẩm đã tồn tại.");
      }  else {
        console.error('Error during create product:', error);
        notification.error({
          message: 'Failed',
          description: "Đã xảy ra lỗi, vui lòng thử lại sau."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-gray-100">
      <div className="w-full h-full max-w-7xl bg-white rounded-lg shadow-lg p-10"> 
        <h2 className="text-2xl font-bold mb-6">Cập nhật sản phẩm</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="images"
            label="Hình ảnh sản phẩm"
            rules={[{ required: true, message: 'Vui lòng thêm hình ảnh sản phẩm!' }]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onRemove={handleRemove}
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
              { min: 10, max: 100, message: 'Tên sản phẩm phải từ 10 đến 100 ký tự.' }
            ]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          {errorMessage && <p className="text-red-500 text-sm mb-1">{errorMessage}</p>}

          <Form.Item
            name="category"
            label="Loại"
            rules={[{ required: true, message: 'Vui lòng chọn ngành hàng!' }]}
          >
            <Select placeholder="Loại">
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <div className='flex'>
            <Form.Item
              name="price"
              label="Giá"
              rules={[
                { required: true, message: 'Vui lòng nhập giá sản phẩm!' }
              ]}
              className='mr-5'
            >
              <Input placeholder="Giá sản phẩm" />
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Số lượng"
              rules={[
                { required: true, message: 'Vui lòng nhập số lượng sản phẩm!' },
              ]}
              className='mr-5'
            >
              <Input placeholder="Số lượng" />
            </Form.Item>

            <Form.Item
              name="sale"
              label="Khuyến mại"
              rules={[
                { required: true, message: 'Vui lòng nhập khuyến mại!' },
              ]}
            >
              <Input placeholder="Khuyến mại" addonAfter="%" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: 'Vui lòng mô tả sản phẩm!' },
              { min: 10, max: 5000, message: 'Mô tả phải từ 10 đến 5000 ký tự.' }
            ]}
          >
            <TextArea placeholder="Mô tả..." />
          </Form.Item>

          <Form.Item>
            <Button 
              type="default"
              htmlType="reset" 
              disabled={uploading || loading}  
              className='mr-5'
            >
              Hủy
            </Button>
            <Button 
              type="primary"
              htmlType="submit" 
              loading={uploading || loading}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default UpdateProduct