'use client'

import Link from 'next/link';
import React, { FormEvent, useState } from 'react'
import { signin } from '@/api/auth';
import { CHANGE_STATUS_AUTH, CHANGE_VALUE_TOKEN } from '@/redux/slices/authSlice';
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  username: yup.string().required('Tên người dùng là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
});

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const checkValidate = await schema.validate(
        { username, password },
        { abortEarly: false }
      );
      if (checkValidate) {
        const res = await signin({
          username: username,
          password: password
        });
        if (res.status === 200) {
          dispatch(CHANGE_STATUS_AUTH(true));
          dispatch(CHANGE_VALUE_TOKEN(res));
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error login: ", error);
      setErrors(errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Đăng nhập
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Chưa có tài khoản?{' '}
          <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn