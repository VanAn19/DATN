import React, { useEffect, useState } from 'react'
import { notification, Skeleton, Spin } from "antd";
import { SkeletonCustomProduct } from "./slide/CustomSlide";
import Image from 'next/image';
import { 
  LoadingOutlined, 
  DropboxOutlined, 
  MinusOutlined, 
  PlusOutlined, 
  HeartFilled, 
  HeartOutlined
} from "@ant-design/icons";
import images from '@/public/images';
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "./CustomSlide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import { addToCart } from '@/api/cart';
import { addProductToFavorite, getUserFavorite, removeProductFromFavorite } from '@/api/favorite';
import { checkAvailableLogin } from '@/utils';
import { useRouter } from 'next/navigation';

const Slider = dynamic(() => import("react-slick"), { ssr: false }) as any;

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function ProductInfo(props: { data: any, user: string, isLoading: boolean }) {
  const { data, user, isLoading } = props;
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const router = useRouter();

  const settings = {  
    infinite: data?.images?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: data?.images?.length > 1 ? <SampleNextArrow /> : null,
    prevArrow: data?.images?.length > 1 ? <SamplePrevArrow /> : null
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1); 
    }
  }

  const addProductToCart = async () => {
    const isAuth = checkAvailableLogin();
    if (!isAuth) {
      router.push('/sign-in');
      return;
    }
    setLoading(true);
    try {
      const product = {
        productId: data._id,
        quantity: quantity,
        name: data.name,
        price: data.sellingPrice,
        thumbnail: data.thumbnail
      }
      await addToCart(product);
      notification.success({
        message: 'Success',
        description: 'Đã thêm sản phẩm vào giỏ hàng!',
      });
    } catch (error) {
      console.error("Error during add product to cart: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAuth = checkAvailableLogin();
    if (!isAuth) return setIsFavorited(false);
    setLoading(true);
    const checkFavorProduct = async () => {
      try {
        const res = await getUserFavorite();
        if (res.status === 200) {
          res.metadata.products.map((product: any) => {
            if (product._id === data._id) {
              setIsFavorited(true);
            } else {
              setIsFavorited(false);
            }
          });
        }
      } catch (error) {
        console.error("Error during check favorite product: ", error);
      } finally {
        setLoading(false);
      }
    }
    checkFavorProduct();
  }, [isFavorited, data._id]);

  const handleFavorite = async () => {
    const isAuth = checkAvailableLogin();
    if (!isAuth) {
      router.push('/sign-in');
      return;
    }
    setLoading(true);
    try {
      if (isFavorited) {
        const res = await removeProductFromFavorite(data._id);
        if (res.status === 200) {
          setIsFavorited(false);
        }
      } else {
        const res = await addProductToFavorite(data._id);
        if (res.status === 200) {
          setIsFavorited(true);
        }
      }
    } catch (error) {
      console.error("Error during handle favorite product: ", error);
    } finally {
      setLoading(false);
    }
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
          <Slider {...settings} className="w-full relative">
            {data?.images?.map((img: { imageUrl: string }, index: number) => (
              // <div key={index} className="w-full flex items-center justify-center">
              <div key={index} className="slider-container w-full h-full">
                <Image
                  className="slider-image"
                  src={img.imageUrl}
                  alt={`product-image-${index}`}
                  width={500}
                  height={500}
                  layout="responsive"
                />
              </div>
            ))}
          </Slider>
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
              {VND.format(data?.sellingPrice)}
            </div>
            <div className="text-2xl text-gray-500 line-through">
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
            <button onClick={decreaseQuantity} className="p-1 border rounded">
              <MinusOutlined />
            </button>
            <span className="mx-2">{quantity}</span>
            <button onClick={increaseQuantity} className="p-1 border rounded">
              <PlusOutlined />
            </button>
          </div>
          <div className="flex items-center gap-2">
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
              disabled={loading}
              onClick={addProductToCart}
            >
              {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "rgb(254, 240, 138)" }} spin />} /> : 'Thêm vào giỏ hàng'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}