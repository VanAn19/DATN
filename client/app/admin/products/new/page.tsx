'use client'

import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Upload, Select, notification, Image, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { deleteImage, uploadImages } from '@/api/upload';
import { Category, FileItem } from '@/types';
import { getListCategory } from '@/api/category';
import { createProduct } from '@/api/product';

const { TextArea } = Input;
const { Option } = Select;

const NewProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isDraft, setIsDraft] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await getListCategory();
        if (res.status === 200) {
          setCategories(res.metadata);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error during fetch category: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [])

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
        // sau khi upload thành công => cập nhật lại fileList với URL từ server
        // setFileList(response.metadata.map((img: any, index: number) => ({
        //   uid: index.toString(),
        //   name: `image-${index}`,
        //   status: 'done',
        //   publicId: img.publicId,
        //   url: img.imageUrl, 
        //   thumbUrl: img.thumbUrl, 
        // })));
        const updatedFileList = response.metadata.map((img: any, index: number) => ({
          uid: index.toString(),
          name: `image-${index}`,
          status: 'done',
          publicId: img.publicId,
          url: img.imageUrl,
          thumbUrl: img.thumbUrl,
        }));
        setFileList(updatedFileList);
        setThumbnail(updatedFileList[0]?.thumbUrl || '');
      } catch (error) {
        console.error("Error during upload images:", error);
      } finally {
        setUploading(false);
      }
    }
  }

  const handleRemove = async (file: any) => {
    try {
      await deleteImage({ publicId: file.publicId });
      // setFileList(fileList.filter((item) => item.uid !== file.uid));
      // // delete preview thumbnail 
      // if (file.publicId === fileList[0]?.publicId) {
      //   setThumbnail(''); 
      // }
      const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(updatedFileList);
      // ảnh đầu tiên bị xóa => update thumbnail thành ảnh tiếp theo
      if (file.uid === fileList[0]?.uid) {
        setThumbnail(updatedFileList[0]?.thumbUrl || '');
      }
    } catch (error) {
      console.error("Error during delete image:", error);
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
      const res = await createProduct({
        name,
        thumbnail,
        images,
        price: Number(price),
        sale: Number(sale),
        quantity: Number(quantity),
        category,
        description,
        isDraft
      });
      if (res.status === 201) {
        notification.success({
          message: 'Success',
          description: 'Sản phẩm đã được tạo thành công.',
        });
        form.resetFields();
        setThumbnail('');
        setFileList([]);
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setErrorMessage("Sản phẩm đã tồn tại.");
      } else {
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
    <div className="p-4">
      <Card title="Thêm mới sản phẩm">
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

          {thumbnail && (
            <Form.Item label="Ảnh bìa">
              <Image
                width={100}
                src={thumbnail}
                alt="Thumbnail"
                preview={false}
              />
            </Form.Item>
          )}

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
                { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
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
            <TextArea autoSize={{ minRows: 6, maxRows: 18 }} placeholder="Mô tả..." />
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
              type="default"
              onClick={() => setIsDraft(true)}
              htmlType="submit"
              disabled={uploading || loading}
              className='mr-5 bg-gray-300'
            >
              Lưu bản nháp
            </Button>
            <Button
              type="primary"
              onClick={() => setIsDraft(false)}
              htmlType="submit"
              loading={uploading || loading}
            >
              Lưu & Hiển thị
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default NewProduct