import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import TruncatedText from "./ui/TruncatedText";
const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

const ProductCard = ({ product }: any) => { //
  return (
    <Link href={`/products/${product.slug}`} className="slide-content pr-8" key={product._id}>
      <div className="card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer w-full sm:w-58">
        <div className="bg-orange-100 overflow-hidden group">
          <Image 
            src={product.thumbnail}
            width={300}
            height={200}
            className="object-contain h-48 w-96 transition-transform duration-300 ease-in-out group-hover:scale-110"
            alt={product?.name}
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-medium h-20">
            <TruncatedText text={product?.name} maxLength={33} />
          </h2> 
          <p className="text-gray-500 mt-2 text-sm">Đã bán {product?.sold}</p>
          <div className="mt-2">
            <span className="text-gray-500 line-through">
              {VND.format(product?.price)}
            </span>
          </div>   
        </div>
      </div>
    </Link>
  )
}

export default ProductCard