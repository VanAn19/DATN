'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Select, notification, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getInfoProduct, updateProduct } from '@/api/product';
import { deleteImage, uploadImages } from '@/api/upload';
import { Category, FileItem } from '@/types';
import { getListCategory } from '@/api/category';
import { useParams, useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';

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
  const router = useRouter();

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
          const images = product.images.map((img: any, index: number) => ({
            uid: index.toString(),
            name: `image-${index}`,
            status: 'done',
            publicId: img.publicId,
            url: img.imageUrl,
            thumbUrl: img.thumbUrl,
          }));
          form.setFieldsValue({
            name: product.name,
            price: product.price,
            sale: product.sale,
            quantity: product.quantity,
            category: product.category,
            description: product.description,
            images: images,
          });
          setFileList(product.images.map((img: any, index: number) => ({
            uid: index.toString(),
            name: `image-${index}`,
            status: 'done',
            publicId: img.publicId,
            url: img.imageUrl,
            thumbUrl: img.thumbUrl,
          })));
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

  const handleImageChange = debounce(async ({ fileList: newFileList }: any) => {
    const newFiles = newFileList.filter((file: any) => !file.url); // ảnh mới
    const existingFiles = fileList.filter((file: any) => file.url); // ảnh cũ (đã có url)
    if (newFiles.length) {
      setUploading(true);
      const formData = new FormData();
      newFiles.forEach((file: any) => {
        formData.append('files', file.originFileObj);
      });
      try {
        const response = await uploadImages(formData);
        const uploadedFiles = response.metadata.map((img: any, index: number) => ({
          uid: (fileList.length + index).toString(),
          name: `image-${index}`,
          status: 'done',
          publicId: img.publicId,
          url: img.imageUrl,
          thumbUrl: img.thumbUrl,
        }));
        setFileList([...existingFiles, ...uploadedFiles]);
        form.setFieldsValue({ images: [...existingFiles, ...uploadedFiles] });
      } catch (error) {
        console.error("Error uploading images:", error);
      } finally {
        setUploading(false);
      }
    } else {
      // không có ảnh mới => chỉ cập nhật fileList với các ảnh hiện tại
      setFileList(newFileList);
      form.setFieldsValue({ images: newFileList });
    }
  }, 500);

  const handleRemove = async (file: any) => {
    try {
      await deleteImage({ publicId: file.publicId });
      const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(updatedFileList); // cập nhật state với ds ảnh mới sau xóa
      form.setFieldsValue({ images: updatedFileList }); // set lại form

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
      if (res.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Cập nhật sản phẩm thành công!',
        });
        router.push('/admin/products');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setErrorMessage("Tên sản phẩm đã tồn tại.");
      } else {
        console.error('Error during update product:', error);
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
    <div className='p-4'>
      <Card title="Cập nhật sản phẩm">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="images"
            label="Hình ảnh sản phẩm"
            rules={[{ required: true, message: 'Vui lòng thêm hình ảnh sản phẩm!' }]}
            valuePropName="fileList" // valuePropName => liên kết với fileList
            getValueFromEvent={(e) => e.fileList} // form nhận dữ liệu từ fileList
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
            <TextArea placeholder="Mô tả..." autoSize={{ minRows: 6, maxRows: 18 }} />
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
      </Card>
    </div>
  )
}

export default UpdateProduct