'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Product } from "@/types";
import { Skeleton } from "antd";
import {
  StyledSlider,
  SampleNextArrow,
  SamplePrevArrow,
  SkeletonCustom,
} from "./CustomSlide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TruncatedText from "./TruncatedText";
import images from '@/public/images'; //

const Slider = dynamic(() => import("react-slick"), { ssr: false }) as any;

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const DefaultSlide = ({ apiAction, title, path }: { apiAction: () => Promise<Product[]>, title: string, path: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const settings = {  
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await apiAction();
        console.log("apiAction::::::::::", res);
        setProducts(res);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      }    
    }
    fetchProducts();
  }, [apiAction])

  return (
    <div className="w-[100%] mx-auto px-4 pt-4">
      <div className="flex justify-between">
        <h1 className="text-lg mobile:text-2xl font-bold mb-4">{title}</h1>
        <Link href={path} className="font-bold text-red-500 text-sm">
          Xem thêm
        </Link>
      </div>

      <div>
        <StyledSlider>
          {loading ? (
            <Slider {...settings} className="w-full relative">
              {[...Array(5).keys()].map((index) => (
                <div key={index}>
                  <SkeletonCustom>
                    <Skeleton.Image active />
                    <Skeleton.Input
                      active
                      size="small"
                      className="w-full pt-4"
                    />
                  </SkeletonCustom>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings} className="w-full relative">
              {products?.map((product) => (
                <Link href={`/products/${product.slug}`} className="slide-content pr-8" key={product._id} >
                  <div className="card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer w-full sm:w-58">
                    <div className="bg-orange-100 overflow-hidden group flex justify-center">
                      <Image
                        src={images.logo}
                        width={300}
                        height={200}
                        className="object-contain h-48 w-96 transition-transform duration-300 ease-in-out group-hover:scale-110"
                        alt={product.name}
                      />
                    </div>
                    <div className="p-2">
                      <h2 className="text-lg font-medium h-12 mobile:h-20">
                        <TruncatedText text={product.name} maxLength={33} />
                      </h2>
                      <p className="text-gray-500 mt-2 text-sm">
                        Đã bán 
                      </p>
                      <div className="mt-2">
                        <span className="text-gray-500">
                          {VND.format(product?.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          )}
        </StyledSlider>
      </div>
    </div>
  );
}

export default DefaultSlide