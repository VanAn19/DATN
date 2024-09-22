'use client'

import React, { FormEvent, useState } from 'react'
import '../../../styles/auth/otpVerified.scss'
import { Button, Spin } from 'antd'
import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { clearAllCookies } from '@/utils';
import { useRouter } from 'next/navigation';

const OtpVerified = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();

  const handleBack = () => {
    clearAllCookies();
    router.push("/");
  };

  const handleOtpChange = (e: any, index: number) => {
    
  };

  const handleOtpSubmit = () => {

  }

  const handleSendOtp = async () => {
    
  };

  const handleResendOtp = async () => {
    
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
              type="button"
              onClick={handleSendOtp}
              className='btnSendOtp mt-2'
            >
              Nhận OTP
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default OtpVerified