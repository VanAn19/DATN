import React, { useState } from 'react'
import { Button, Modal, Radio, Skeleton, Space, Spin, Table, Tag } from "antd";
import { SkeletonCustomProduct } from "./slide/CustomSlide";
import Image from 'next/image';
import { LoadingOutlined, DropboxOutlined, MinusOutlined, PlusOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import images from '@/public/images';

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function ProductInfo(props: { data: any, user: string, isLoading: boolean }) {
  const { data, user, isLoading } = props;
  const [isFavorited, setIsFavorited] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const increaseQuantity = (id: string) => {
    // Logic để tăng số lượng sản phẩm trong giỏ
  }

  const decreaseQuantity = (id: string) => {
    // Logic để giảm số lượng sản phẩm trong giỏ
  }

  const addToCart = () => {
    
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  }
    
  return (
    <div className="flex flex-col xl:flex-row w-full h-full mt-[100px] gap-8 px-4 mb-[100px]">
      <div className="xl:w-[50%] w-full h-full flex flex-col items-center justify-center gap-8">
        {isLoading ? (
          <SkeletonCustomProduct>
            <Skeleton.Image
              className="skeleton-image h-[100%] flex items-center justify-center"
              active={true}
              style={{ width: "300px !important" }}
            />
          </SkeletonCustomProduct>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image
              className="object-contain h-[100%]"
              src={data?.thumbnail}
              alt="product"
              width={500}
              height={500}
            />
          </div>
        )}

        <div className="flex items-center w-[100%] justify-around">
          {isLoading ? (
            <Skeleton.Input active />
          ) : (
            <div className="flex items-center gap-2 ml-8">
              <span className="text-sm ml-10">Chia sẻ:</span>
              <a href="/">
                <Image
                  src={images.facebookLogo}
                  alt='Facebook'
                  width={25}
                  height={25}
                />
              </a>
              <a href="/">
                <Image
                  src={images.messengerLogo}
                  alt='Messenger'
                  width={25}
                  height={25}
                />
              </a>
              <a href="/">
                <Image
                  src={images.twitterLogo}
                  alt='Twitter'
                  width={25}
                  height={25}
                />
              </a>
            </div>
          )}
          {isLoading ? (
            <Skeleton.Input active />
          ) : (
            <div className="flex items-center justify-center gap-1 pl-1 w-[250px] border-l-2">
              {isFavorited ? (
                <HeartFilled className='cursor-pointer' style={{ fontSize: '25px' }} onClick={handleFavorite} />
              ) : (
                <HeartOutlined className='cursor-pointer' style={{ fontSize: '25px' }} onClick={handleFavorite} />
              )}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-5">
          <Skeleton.Input active />
          <Skeleton.Input active />
          <Skeleton.Input active />
          <Skeleton.Input active />
          <div className="flex gap-5">
            <Skeleton.Input active />
            <Skeleton.Input active />
          </div>
        </div>
      ) : (
        <div className="flex xl:w-1/2 w-full h-full flex-col justify-between gap-5 pr-5">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">{data?.name}</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-3xl text-red-500">
              {VND.format(data?.price)}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className='' style={{ letterSpacing: '0.2px', lineHeight: '1.4' }}>{data?.description}</div>
          </div>
          <div className="flex items-center gap-2 ml-3">
            <span className="blinking-dot"></span>
            <div className=''>Còn Hàng</div>
          </div>
          <div className="flex items-center gap-2 ml-3">
            <span className="mr-5">Vận Chuyển</span>
            <Image 
              src={images.freeShip}
              alt='FreeShip'
              width={30}
              height={30}
            />
            <div className=''>Miễn phí vận chuyển</div>
          </div>
          <div className="flex items-center gap-2 ml-3">
            <span className="mr-5">Chính Sách Đổi Trả</span>
            <DropboxOutlined style={{ fontSize: '16px' }} />
            <div className=''>Đổi trả trong 7 ngày</div>
          </div>
          <div className="flex items-center gap-2 ml-3">
            <span className='mr-5'>Số lượng</span>
            <button onClick={() => decreaseQuantity(data._id)} className="p-1 border rounded">
              <MinusOutlined />
            </button>
            <span className="mx-2">1</span>
            <button onClick={() => increaseQuantity(data._id)} className="p-1 border rounded">
              <PlusOutlined />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {/* <button
              style={{
                backgroundColor: "rgb(255, 245, 241)",
                border: "1px solid rgb(255, 66, 78)",
                color: "rgb(255, 66, 78)",
                width: "200px",
                cursor: "pointer",
                animation: "2s linear 0s infinite normal none running thumbs-up",
              }}
              className="flex items-center justify-center py-2"
              onClick={handleFavorite}
            >
              {isFavorited ? (
                <>
                  {loadingFavorite ? (
                    <div>
                      <Space>
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{
                                fontSize: 30,
                                color: "rgb(255, 66, 78)",
                              }}
                              spin
                            />
                          }
                        />
                      </Space>
                    </div>
                  ) : (
                    <>
                      <svg
                        style={{
                          color: "rgb(255, 66, 78)",
                          width: "30px",
                          height: "30px",
                          fill: "currentColor",
                        }}
                      >
                        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                      </svg>
                      <div>Đã yêu thích</div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {loadingFavorite ? (
                    <div>
                      <Space>
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{
                                fontSize: 30,
                                color: "rgb(255, 66, 78)",
                              }}
                              spin
                            />
                          }
                        />
                      </Space>
                    </div>
                  ) : (
                    <>
                      <svg
                        style={{
                          color: "rgb(255, 66, 78)",
                          width: "30px",
                          height: "30px",
                          fill: "currentColor",
                        }}
                      >
                        <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                      </svg>
                      <div>Thêm vào yêu thích</div>
                    </>
                  )}
                </>
              )}
            </button> */}
            <button
              style={{
                backgroundColor: "black",
                color: "rgb(254, 240, 138)",
                cursor: "pointer",
                width: "100%",
                height: '50px',
                paddingTop: "11.5px",
                paddingBottom: "11.5px",
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={addToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}