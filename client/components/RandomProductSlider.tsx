import { getRandomProducts } from "@/api/product";
import DefaultSlide from "./ui/slide/DefaultSlide";
import { useParams } from "next/navigation";

const RandomProductSlider = () => {
  const params = useParams();  
  const slug = params?.slug as string;
  const productId = slug.split('.').pop() || '';
  return (
    <DefaultSlide 
      apiAction={async () => {
        // 'use server'
        const products = await getRandomProducts(productId);
        return products;
      }}
      title="Có thể bạn quan tâm"
      path="/products"
    />
  )
}

export default RandomProductSlider