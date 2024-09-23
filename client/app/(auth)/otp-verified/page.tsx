'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import '../../../styles/auth/otpVerified.scss'
import { Button, Spin } from 'antd'
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { clearAllCookies, getCookie, setCookie } from '@/utils';
import { useRouter } from 'next/navigation';
import { resendOtp, verifyOtp } from '@/api/auth';
import { useDispatch } from 'react-redux';
import { CHANGE_STATUS_AUTH, CHANGE_VALUE_USER } from '@/redux/slices/authSlice';

const OtpVerified = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(true);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();
  const dispatch = useDispatch();
  const infoUser = getCookie('user');
  const expirationHours = 3;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isOtpSent) {
      setCanResendOtp(false);
      setCountdown(60);
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setCanResendOtp(true);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent]);

  const handleBack = () => {
    clearAllCookies();
    router.push("/");
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setIsLoading(true);
      try {
        const res = await verifyOtp({ username: infoUser.username, otp: otpCode });
        if (res.status === 200) {
          dispatch(CHANGE_STATUS_AUTH(true));
          dispatch(CHANGE_VALUE_USER(res));
          setCookie("token", res?.metadata?.tokens?.accessToken, expirationHours);
          setCookie("user", res?.metadata?.user, expirationHours);
          router.push("/");
        }
      } catch (error) {
        console.error('Error verify otp:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await resendOtp({ username: infoUser.username });
      if (res.status === 200) {
        setOtp(["", "", "", "", "", ""]);
        setIsOtpSent(true);
        const input = document.getElementById("otp-input-0");
        if (input) {
          input.focus();
        }
      }
    } catch (error) {
      console.error('Error resend otp:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='formOtpVerification'>
      <div className='backgroundform'>
        <Button 
          type="primary"
          className="left-[-185px] top-[-34px]"
          danger
          size="small"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
        />
        <h2 className="text-2xl font-bold mb-4">Chúng tôi đã gửi bạn mã OTP qua email đăng ký, vui lòng kiểm tra!</h2>
        <form onSubmit={handleOtpSubmit} className='formSubmit'>
          <div className='groupInput'>
            {otp.map((digit, index) => (
              <input 
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                className='otpInput'
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
              />
            ))}
          </div>
          <button type="submit" className='btnVerifyOtp mt-4'>
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
              "Xác Thực"
            )}
          </button>
          {isOtpSent ? (
            canResendOtp ? (
              <button
                type="button"
                onClick={handleResendOtp}
                className='btnResendOtp mt-2'>
                Gửi Lại OTP
              </button>
            ) : (
              <button
                type="button"
                className='btnResendOtp mt-2'
                disabled
              >
                Gửi Lại OTP ({countdown}s)
              </button>
            )
          ) : (
            <button
              type="submit"
              className='btnSendOtp mt-2'
            >
              Gửi
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default OtpVerified