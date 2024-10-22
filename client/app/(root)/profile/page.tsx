'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Input, message, Upload, Slider, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { getInfoUser, updateInfoUser } from '@/api/user';
import { InfoUser } from '@/types/user';
import { uploadImage } from '@/api/upload';
import { RcFile } from 'antd/es/upload';
import { setCookie } from '@/utils';
import AvatarEditor from 'react-avatar-editor';

const Profile = () => {
  const expirationHours = 3;
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState<string>('');
  const [user, setUser] = useState<InfoUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editorVisible, setEditorVisible] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchInfoUser = async () => {
      try {
        const res = await getInfoUser();
        if (res.status === 200) {
          setUser(res.metadata);
          setAvatarFile(res.metadata.avatar);
          form.setFieldsValue({
            name: res.metadata.name || '',
            email: res.metadata.email || '',
            phone: res.metadata.phone || ''
          });
        }
      } catch (error) {
        console.error("Failed to fetch info user:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInfoUser();
  }, [form]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể upload file JPG/PNG!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải có dung lượng nhỏ hơn 2MB!');
      return Upload.LIST_IGNORE;
    }
    return isJpgOrPng && isLt2M;
  };

  const handleImageChange = async (info: any) => {
    const { file } = info;
    if (file.status === 'uploading') {
      return;
    }
    setImageFile(file.originFileObj);
    setEditorVisible(true);
  }

  const handleSave = async () => {
    if (editorRef.current && imageFile) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
      const blob = await fetch(canvas).then(res => res.blob());

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', blob, imageFile.name);
        const res = await uploadImage(formData);
        if (res.status === 200) {
          const { imageUrl } = res.metadata;
          setAvatarFile(imageUrl);
          setUser((prev) => (prev ? { ...prev, avatar: imageUrl } : null));
        }
      } catch (error) {
        console.error("Error during upload avatar: ", error);
      } finally {
        setUploading(false);
        setEditorVisible(false);
      }
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { name, email, phone } = values;
      const res = await updateInfoUser({
        name,
        email,
        phone, 
        avatar: avatarFile
      });
      if (res.status === 200) {
        message.success('Lưu thông tin mới thành công!');
        setCookie("user", res.metadata, expirationHours);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during update info user: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md max-w-4xl mx-auto my-8">
      <h1 className="text-xl font-bold mb-4">Hồ Sơ Của Tôi</h1>
      <p className="mb-4 text-gray-500">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <Form.Item label="Tên đăng nhập">
              <Input value={user?.username} disabled className='custom-input' />
            </Form.Item>

            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
            >
              <Input className='custom-input' />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email của bạn' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input className='custom-input' />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                { pattern: /^\d{10,11}$/, message: 'Số điện thoại không hợp lệ' },
              ]}
            >
              <Input className='custom-input' />
            </Form.Item>

            <button
              type="submit" 
              disabled={loading || uploading}
              className={`w-full h-14 py-2 text-yellow-200 bg-black transition duration-200 ease-in-out rounded-lg 
                ${loading || uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-yellow-300'}`}
            >
              {loading || uploading ? 'Lưu...' : 'Lưu'}
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
              <Image
                src={avatarFile || user?.avatar || ''}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <Upload
              name="avatar"
              listType="picture"
              className="upload-list-inline"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleImageChange}
            >
              <Button loading={uploading} icon={<UploadOutlined />}>Chọn Ảnh</Button>
            </Upload>
            <p className="text-gray-500 mt-2 text-center">
              Dụng lượng file tối đa 2 MB <br /> Định dạng: .JPEG, .PNG
            </p>
            </div>
          </div>
      </Form>
      <Modal
        open={editorVisible}
        title="Chỉnh sửa ảnh đại diện"
        onCancel={() => setEditorVisible(false)}
        onOk={handleSave}
        okText="Lưu"
        cancelText="Hủy"
        confirmLoading={uploading}
      >
        {imageFile && (
          <>
            <div className="flex justify-center">
              <AvatarEditor
                ref={editorRef}
                image={imageFile}
                width={150}
                height={150}
                border={50}
                borderRadius={75}
                color={[255, 255, 255, 0.6]} 
                scale={scale}
                rotate={0}
              />
            </div>
            <Slider 
              min={1}
              max={3}
              step={0.01}
              value={scale}
              tooltip={{ formatter: null }}
              onChange={(value) => setScale(value)}
              className="mt-4"
            />
          </>
        )}
      </Modal>
    </div>
  )
}

export default Profile