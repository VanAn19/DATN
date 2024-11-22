import React from 'react'
import {
    FacebookOutlined,
    YoutubeOutlined,
    TikTokOutlined
} from "@ant-design/icons";
import images from '@/public/images';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const socialIcons = [
    { component: FacebookOutlined, name: 'Facebook', href: 'https://www.facebook.com/xuongrentrongbinh', parentClass: "facebook-icon pl-2", },
    { component: YoutubeOutlined, name: 'Youtube', href: 'https://www.youtube.com/@langrenlynhan', parentClass: "youtube-icon pb-2" },
    { component: TikTokOutlined, name: 'Tiktok', href: 'https://www.tiktok.com/@xuongrentrongbinh', parentClass: "tiktok-icon pb-2", }
  ]

  const pageItems = [
    { label: "Chính sách quyền riêng tư", link: "" },
    { label: "Chính sách bảo mật", link: "" },
    { label: "Chính sách bảo hành", link: "" },
    { label: "Chính sách hoàn trả hàng", link: "", },
    { label: "Điều khoản dịch vụ", link: "", },
  ];

  return (
    <div className='w-full z-40 bg-[#333] text-white bottom-0 px-15 md:px-5'>
      <div className='padding_content flex flex-col'>
        <div className='top w-full py-7 flex flex-col sm:flex-row sm:justify-between'>
          <div className='info w-full sm:w-1/4 relative flex flex-col'>
            <div className="logo flex flex-col items-center justify-center">
              <Link href='/' className="flex flex-center">
                <Image 
                  className="object-contain rounded_image"
                  priority={true}
                  src={images.logo}
                  width={80}
                  height={80}
                  alt="Logo"
                />
              </Link>
              <div className="pl-10 mobile:pl-20 sm:pl-5">
                <p className="w-fit font-bold py-5">CÔNG TY TNHH TRỌNG BÌNH</p>
              </div>
            </div>
          </div>

          <div className="pages w-full sm:w-1/2 flex flex-row justify-between">
            <div className="flex flex-col w-1/2 sm:pl-10 px-5">
              <p className="footer_text font-semibold text-lg text_white pb-7">
                Bạn cần hỗ trợ
              </p>
              <p className="footer_text text-2xl font-bold text_white pb-5">
                0946 296 296
              </p>
              <p className="footer_text text_white pb-7">
                <strong>Địa chỉ: </strong>
                Làng rèn truyền thống, thôn Bàn Mạch, xã Lý Nhân, huyện Vĩnh Tường, tỉnh Vĩnh Phúc
              </p>
              <p className="footer_text text_white pb-7">
                <strong>Email: </strong>
                trongbinh88@gmail.com
              </p>
            </div>
            <div className="flex flex-col w-1/2 px-5">
              <p className="footer_text font-semibold text-lg text_white pb-7">
                Thông tin
              </p>
              {pageItems.map((pageItem, index) => (
                <Link key={index} href={pageItem.link}>
                  <p className="footer_text py-3 hover:underline">
                    {pageItem.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="contact w-full sm:w-1/4 flex flex-col items-center sm:items-start">
            <p className="font-semibold text-lg pb-7">
              Theo dõi chúng tôi tại
            </p>
            <div className='flex space-x-4'>
              {socialIcons.map(({ component: IconComponent, href, parentClass }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  className={parentClass}
                >
                  <IconComponent style={{ fontSize: '24px' }} />
                </Link>
              ))}
            </div>
            {/* <p className="font-semibold text-lg pt-7 pb-4">
              Thông tin thanh toán
            </p>
            <div className="flex flex-col">
              <p>Số tài khoản: 104873713029</p>
              <p>Chủ tài khoản: NGUYEN VAN AN</p>
              <p>Ngân hàng: Ngân hàng Thương mại Cổ phần Công thương Việt Nam</p>
            </div> */}
          </div>
        </div>
        <div className="bottom flex justify-center items-center">
          <p className="footer_text pb-7 px-3">
            © Bản quyền thuộc về DAO TRỌNG BÌNH | Cung cấp bởi CÔNG TY TNHH TRỌNG BÌNH
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer