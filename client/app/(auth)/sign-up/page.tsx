'use client'

import Link from 'next/link';
import React, { FormEvent, useState } from 'react'
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import images from '@/public/images';
import '../../../styles/auth/signup.scss'
import { Checkbox, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { signup } from '@/api/auth';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const schema = yup.object().shape({
  username: yup.string().required('Tên người dùng là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
  name: yup.string().required('Tên đăng nhập là bắt buộc'),
  email: yup.string().matches(emailRegExp, 'Email không hợp lệ').required('Email là bắt buộc'),
  phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Số điện thoại là bắt buộc'),
  address: yup.string().required('Địa chỉ là bắt buộc'),
});

const SignUp = () => {
  const expirationHours = 3;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(false);
    try {
      const checkValidate = await schema.validate(
        { username, password, name, email, phone, address },
        { abortEarly: false }
      );
      if (checkValidate) {
        const res = await signup({
          username,
          password,
          name,
          email,
          phone,
          address
        });
        if (res.status === 201) {
          
        }
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="form-signup p-[2%] mobile:p-[50px]">
      <form onSubmit={handleSignUp} className="form-submit flex-col mobile:flex-row">
        <div className="box-left w-full mobile:w-[50%]">
          <Image
            className="object-contain rounded_image img-singup"
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
                name="name"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="group-input">
              <p>Họ và tên</p>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="group-input">
            <p>Số điện thoại</p>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="group-input">
            <p>Email</p>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="group-input-password">
            <div className="group-input">
              <p>Mật khẩu</p>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="group-input">
              <p>Nhập lại mật khẩu</p>
              <input
                type="password"
                name="corfirmPass"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="group-input">
            <p>Địa chỉ</p>
            <input
              type="text"
              name="affsource"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Checkbox className="mt-2 font-semibold">Tôi đồng ý với các <Link href={`https://ezpics.vn/post/32`} className="text-blue-600">Điều khoản dịch vụ của Dao Trọng Bình</Link></Checkbox>
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