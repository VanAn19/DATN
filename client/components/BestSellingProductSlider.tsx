import { getProductsList } from "@/api/product";
import DefaultSlide from "./ui/slide/DefaultSlide";

const BestSellingProductSlider = () => {
  return (
    <DefaultSlide 
      apiAction={async () => {
        'use server'
        const products = await getProductsList();
        return products;
      }}
      title="Sản phẩm bán chạy"
      path="/products"
    />
  )
}

export default BestSellingProductSlider