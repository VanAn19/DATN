'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import images from '@/public/images';
import '../../../styles/auth/signup.scss'
import { Checkbox, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { signup } from '@/api/auth';
import { setCookie } from '@/utils';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const schema = yup.object().shape({
  username: yup.string().required('Tên người dùng là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
  name: yup.string().required('Tên đăng nhập là bắt buộc'),
  email: yup.string().matches(emailRegExp, 'Email không hợp lệ').required('Email là bắt buộc'),
  phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại là bắt buộc'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không khớp')
    .required('Nhập lại mật khẩu là bắt buộc'),
});

const SignUp = () => {
  const expirationHours = 3;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignUp = async (data: any) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await signup(data);
      if (res.status === 201) {
        setCookie('user', res?.metadata?.user, expirationHours);
        router.push('/otp-verified');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setErrorMessage("Tên người dùng đã tồn tại.");
      } else {
        console.error('Error sign in:', error);
        setErrorMessage("Đã xảy ra lỗi, vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-signup p-[2%] mobile:p-[50px]">
      <form onSubmit={handleSubmit(handleSignUp)} className="form-submit flex-col mobile:flex-row">
        <div className="box-left w-full mobile:w-[50%]">
          <Image
            className="object-contain rounded_image img-signup"
            priority={true}
            src={images.imgSignUp}
            alt="SignUp Image"
          />
        </div>
        <div className="box-right">
          <h2 className="title-sign">Dao Trọng Bình - Người giúp việc nhiệt tình! 👋</h2>
          <div className="group-input-password">
            <div className="group-input">
              <p>Tên đăng nhập</p>
              <input
                type="text"
                {...register('username')}
              />
              {errors.username && <span className="error-message">{errors.username.message}</span>}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="group-input">
              <p>Họ và tên</p>
              <input
                type="text"
                {...register('name')}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>
          </div>
          <div className="group-input">
            <p>Số điện thoại</p>
            <input
              type="text"
              {...register('phone')}
            />
            {errors.phone && <span className="error-message">{errors.phone.message}</span>}
          </div>
          <div className="group-input">
            <p>Email</p>
            <input
              type="text"
              {...register('email')}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className="group-input-password">
            <div className="group-input">
              <p>Mật khẩu</p>
              <input
                type="password"
                {...register('password')}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>
            <div className="group-input">
              <p>Nhập lại mật khẩu</p>
              <input
                type="password"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
            </div>
          </div>
          <div className="group-input">
            <p>Địa chỉ</p>
            <input
              type="text"
              {...register('address')}
            />
            {errors.address && <span className="error-message">{errors.address.message}</span>}
          </div>
          {/* <Checkbox className="mt-2 font-semibold">
            Tôi đồng ý với các <Link href={`https://ezpics.vn/post/32`} className="text-blue-600">Điều khoản dịch vụ của Dao Trọng Bình</Link>
          </Checkbox> */}
          <button type="submit" className="btn-submit-sign">
            {isLoading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: 24,
                      color: "white",
                    }}
                    spin
                  />
                }
              />
            ) : (
              "Đăng ký"
            )}
          </button>
          <div className="nav-sign">
            Đã có tài khoản?{' '}
            <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
              Đăng nhập
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp