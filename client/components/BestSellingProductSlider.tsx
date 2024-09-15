import { getBestSellingProducts } from "@/api/product";
import DefaultSlide from "./ui/DefaultSlide";

const BestSellingProductSlider = () => {
  return (
    <DefaultSlide 
      apiAction={async () => {
        'use server'
        const products = await getBestSellingProducts();
        return products;
      }}
      title="Sản phẩm bán chạy"
      path="/best-selling-products"
    />
  )
}

export default BestSellingProductSlider